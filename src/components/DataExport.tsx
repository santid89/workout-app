import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { toast } from '@/store/toastStore';
import { todayStr } from '@/lib/date';
import { DownloadIcon } from '@/lib/icons';

/**
 * Downloads everything the app holds for this user as one JSON file — workouts,
 * placements and injections. Firestore is the system of record, but a file you
 * own outright is the backup that survives a bad delete, a lost account, or
 * this app going away. Runs entirely in the browser; nothing is uploaded.
 */
export function DataExport() {
  const user = useAppStore((s) => s.user);
  const logs = useAppStore((s) => s.logs);
  const placements = useAppStore((s) => s.placements);
  const injections = useAppStore((s) => s.injections);
  const cadenceDays = useAppStore((s) => s.cadenceDays);
  const [busy, setBusy] = useState(false);

  const onDownload = () => {
    setBusy(true);
    try {
      const payload = {
        exportedAt: new Date().toISOString(),
        account: user?.email ?? null,
        workouts: logs,
        health: { cadenceDays, placements, injections },
      };
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(payload, null, 2)], {
          type: 'application/json',
        })
      );
      const a = document.createElement('a');
      a.href = url;
      a.download = `training-export-${todayStr()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast('Export downloaded', 'success');
    } catch (e) {
      const err = e as { message?: string };
      toast("Couldn't export: " + (err.message ?? 'unknown error'), 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="api-card">
      <div className="api-card-head">💾 Your data</div>
      <p>
        Download every workout, placement and injection as a single JSON file.
        Your own copy, kept on your device — no upload, no link, nothing shared.
      </p>
      <button className="export-btn" onClick={onDownload} disabled={busy}>
        <DownloadIcon />
        <span>Download my data</span>
      </button>
      <p className="api-hint">
        Injection records are <b>never</b> included in the shareable API link on
        the Log tab — that feed carries training data only.
      </p>
    </div>
  );
}
