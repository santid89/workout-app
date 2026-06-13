import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { shareUrl } from '@/firebase/config';
import { toast } from '@/store/toastStore';

/** The private read-only JSON feed card shown at the bottom of the Log tab. */
export function ApiAccess() {
  const shareToken = useAppStore((s) => s.shareToken);
  const [copied, setCopied] = useState(false);
  const url = shareToken ? shareUrl(shareToken) : '';

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast('API link copied', 'success');
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast('Copy failed — long-press the link to copy', 'error');
    }
  };

  return (
    <div className="api-card">
      <div className="api-card-head">🔗 API access</div>
      <p>
        A private, read-only JSON feed of your log. Hand this URL to Claude (or
        any tool) to have it read your training history.
      </p>
      {shareToken ? (
        <>
          <div className="api-url-row">
            <div className="api-url">{url}</div>
            <button className="api-copy" onClick={onCopy}>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="api-hint">
            Only someone with this exact link can read it (writes stay private to
            you). Your sessions are a JSON string in the response's <b>json</b>{' '}
            field. Ask me to "rotate my API link" anytime to revoke it.
          </p>
        </>
      ) : (
        <p className="api-hint">Preparing your link…</p>
      )}
    </div>
  );
}
