/**
 * Downscales an image File so its longest side is at most `maxDim` px and
 * re-encodes it as JPEG. Keeps uploads small (cheaper storage + faster Gemini
 * calls, well under inline-image size limits). On any failure it resolves to the
 * original file so logging never breaks on a quirky image.
 */
export async function downscaleImage(
  file: File,
  maxDim = 1280,
  quality = 0.82
): Promise<File> {
  if (!file.type.startsWith('image/')) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    // Already small enough — don't bother re-encoding.
    if (scale === 1) {
      bitmap.close();
      return file;
    }

    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', quality)
    );
    if (!blob) return file;

    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return new File([blob], name, { type: 'image/jpeg' });
  } catch {
    return file;
  }
}
