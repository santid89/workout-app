import { useAppStore } from '@/store/useAppStore';
import { DAYS, REF, COLORS, todayDayKey } from '@/data/theme';
import { ChevronIcon, GoogleIcon } from '@/lib/icons';
import { doSignIn } from '@/lib/actions';

const ALL = [...DAYS, ...REF];

export function Header() {
  const selectedDay = useAppStore((s) => s.selectedDay);
  const toggleSheet = useAppStore((s) => s.toggleSheet);
  const sheetOpen = useAppStore((s) => s.sheetOpen);

  const d = ALL.find((x) => x.key === selectedDay) ?? ALL[0];
  const isToday = d.key === todayDayKey();
  const label = isToday ? 'Today · ' + d.short : d.short;
  const dotColor = COLORS[d.color];

  return (
    <header className="header">
      <div className="header-inner">
        <button
          className={'picker' + (sheetOpen ? ' open' : '')}
          aria-haspopup="listbox"
          aria-expanded={sheetOpen}
          onClick={toggleSheet}
        >
          <span
            className="picker-dot"
            style={{ background: dotColor, color: dotColor }}
          />
          <div className="picker-text">
            <span className="picker-label">{label}</span>
            <span className="picker-title">{d.name}</span>
          </div>
          <ChevronIcon className="picker-chev" />
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
          className="avatar-btn"
          id="avatarBtn"
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
