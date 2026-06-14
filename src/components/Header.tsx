import { useAppStore } from '@/store/useAppStore';
import { GoogleIcon } from '@/lib/icons';
import { doSignIn } from '@/lib/actions';

/**
 * Mobile top bar: brand on the left, account on the right. Day navigation now
 * lives in the always-visible week strip + bottom nav, so the old dropdown
 * picker is gone. On desktop this bar is hidden — the sidebar carries brand
 * and account instead.
 */
export function Header() {
  const selectDay = useAppStore((s) => s.selectDay);

  return (
    <header className="header">
      <div className="header-inner">
        <button
          className="brand"
          onClick={() => selectDay('today')}
          aria-label="Home"
        >
          <span className="brand-dot" />
          <span className="brand-word">Training</span>
        </button>
        <AuthArea />
      </div>
    </header>
  );
}

function AuthArea() {
  const user = useAppStore((s) => s.user);
  const toggleAccountMenu = useAppStore((s) => s.toggleAccountMenu);

  if (user) {
    const initial = (user.displayName || user.email || '?').trim().charAt(0);
    return (
      <div className="auth-area">
        <button
          className="avatar-btn js-avatar"
          aria-label="Account"
          onClick={toggleAccountMenu}
        >
          {user.photoURL ? (
            <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
          ) : (
            <span className="avatar-fallback">{initial}</span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="auth-area">
      <button className="auth-btn" onClick={doSignIn}>
        <GoogleIcon />
        <span className="auth-btn-text">Sign in</span>
      </button>
    </div>
  );
}
