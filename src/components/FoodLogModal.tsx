import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { addFoodLog } from '@/firebase/food';
import { doSignIn } from '@/lib/actions';
import { toast } from '@/store/toastStore';
import { CameraIcon } from '@/lib/icons';

/**
 * Quick food capture: a high-level text description and/or a photo. Saves a
 * `pending` entry; the server's Gemini routine fills in the nutrition estimate.
 */
export function FoodLogModal() {
  const open = useAppStore((s) => s.foodLogModal.open);
  const user = useAppStore((s) => s.user);
  const close = useAppStore((s) => s.closeFoodLogModal);

  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Reset each time the modal (re)opens.
  useEffect(() => {
    if (open) {
      setDescription('');
      setSaving(false);
      setFile(null);
      setPreview((p) => {
        if (p) URL.revokeObjectURL(p);
        return null;
      });
    }
  }, [open]);

  // Release the last preview URL on unmount.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const pickFile = (f: File | null) => {
    setPreview((p) => {
      if (p) URL.revokeObjectURL(p);
      return f ? URL.createObjectURL(f) : null;
    });
    setFile(f);
  };

  const clearPhoto = () => {
    pickFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const onSave = async () => {
    if (!user) {
      close();
      doSignIn();
      return;
    }
    const desc = description.trim();
    if (!desc && !file) {
      toast('Add a description or a photo', 'error');
      return;
    }
    setSaving(true);
    try {
      await addFoodLog(user.uid, { description: desc, file });
      close();
      toast('Food logged — analysing…', 'success');
    } catch (e) {
      const err = e as { code?: string; message?: string };
      toast("Couldn't save: " + (err.code || err.message), 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={'modal-backdrop' + (open ? ' open' : '')}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="foodModalTitle"
      >
        <div className="modal-title" id="foodModalTitle">
          Log food
        </div>
        <div className="modal-sub">
          Describe what you ate or add a photo — we'll estimate the nutrition for
          you.
        </div>

        <div className="field">
          <label className="field-label" htmlFor="foodDesc">
            What did you eat?
          </label>
          <textarea
            id="foodDesc"
            className="field-textarea"
            rows={3}
            placeholder="e.g. Chicken burrito bowl with rice, beans and guac"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="field-label">Photo (optional)</label>
          <input
            ref={fileRef}
            id="foodPhoto"
            type="file"
            accept="image/*"
            capture="environment"
            className="visually-hidden-input"
            onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
          />
          {preview ? (
            <div className="food-photo-preview">
              <img src={preview} alt="Selected food" />
              <button
                type="button"
                className="food-photo-remove"
                onClick={clearPhoto}
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="food-photo-pick"
              onClick={() => fileRef.current?.click()}
            >
              <CameraIcon />
              <span>Add a photo</span>
            </button>
          )}
        </div>

        <div className="modal-actions">
          <button className="modal-btn secondary" onClick={close}>
            Cancel
          </button>
          <button
            className="modal-btn primary"
            onClick={onSave}
            disabled={saving}
          >
            {saving ? 'Saving…' : 'Log food'}
          </button>
        </div>
      </div>
    </div>
  );
}
