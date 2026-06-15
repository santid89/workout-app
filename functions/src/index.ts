import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { defineSecret } from 'firebase-functions/params';
import * as logger from 'firebase-functions/logger';
import { initializeApp } from 'firebase-admin/app';
import { FieldValue } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { GoogleGenAI, Type } from '@google/genai';

initializeApp();

/** Gemini AI Studio key — set with `firebase functions:secrets:set GEMINI_API_KEY`. */
const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY');

/** Multimodal, fast and inexpensive — a good fit for meal-photo estimation. */
const MODEL = 'gemini-2.5-flash';

const PROMPT = [
  'You are a nutrition estimation assistant for a fitness app.',
  'From the food description and/or photo, identify the items eaten and',
  'estimate their nutrition. Assume typical restaurant/home portion sizes when',
  'the amount is unclear, and set "confidence" accordingly (low/medium/high).',
  'All macro values are in grams; calories in kcal. Totals should be the sum of',
  'the items. If you genuinely cannot identify any food, return zeros with a',
  'short summary saying so and confidence "low".',
].join(' ');

/** JSON schema Gemini must return — mirrors the FoodNutrition type on the client. */
const NUTRITION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: 'A short human-readable summary of the meal.',
    },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          calories: { type: Type.NUMBER },
          protein_g: { type: Type.NUMBER },
          carbs_g: { type: Type.NUMBER },
          fat_g: { type: Type.NUMBER },
        },
        required: ['name', 'calories', 'protein_g', 'carbs_g', 'fat_g'],
      },
    },
    calories: { type: Type.NUMBER },
    protein_g: { type: Type.NUMBER },
    carbs_g: { type: Type.NUMBER },
    fat_g: { type: Type.NUMBER },
    confidence: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
  },
  required: [
    'summary',
    'items',
    'calories',
    'protein_g',
    'carbs_g',
    'fat_g',
    'confidence',
  ],
};

type Part = { text: string } | { inlineData: { mimeType: string; data: string } };

/**
 * Fires when a new food log is created. Calls Gemini with the description and/or
 * photo, then writes the structured nutrition estimate back onto the document.
 */
export const onFoodLogCreated = onDocumentCreated(
  { document: 'users/{uid}/foodLogs/{id}', secrets: [GEMINI_API_KEY] },
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data();
    // Only process fresh, pending entries (ignore our own write-backs).
    if (data.status && data.status !== 'pending') return;

    const description: string | undefined = data.description;
    const photoPath: string | undefined = data.photoPath;
    if (!description && !photoPath) {
      await snap.ref.update({
        status: 'error',
        error: 'Entry had neither a description nor a photo.',
        processedAt: FieldValue.serverTimestamp(),
      });
      return;
    }

    try {
      const parts: Part[] = [
        {
          text:
            PROMPT +
            (description ? `\n\nUser description: ${description}` : ''),
        },
      ];

      if (photoPath) {
        const file = getStorage().bucket().file(photoPath);
        const [buf] = await file.download();
        const [meta] = await file.getMetadata();
        parts.push({
          inlineData: {
            mimeType: meta.contentType || 'image/jpeg',
            data: buf.toString('base64'),
          },
        });
      }

      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY.value() });
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: [{ role: 'user', parts }],
        config: {
          responseMimeType: 'application/json',
          responseSchema: NUTRITION_SCHEMA,
          temperature: 0.2,
        },
      });

      const text = response.text;
      if (!text) throw new Error('Empty response from Gemini');
      const nutrition = JSON.parse(text);

      await snap.ref.update({
        status: 'processed',
        nutrition,
        processedAt: FieldValue.serverTimestamp(),
      });
      logger.info('Food log processed', {
        path: snap.ref.path,
        calories: nutrition?.calories,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error('Food log processing failed', { path: snap.ref.path, message });
      await snap.ref.update({
        status: 'error',
        error: message.slice(0, 500),
        processedAt: FieldValue.serverTimestamp(),
      });
    }
  }
);
