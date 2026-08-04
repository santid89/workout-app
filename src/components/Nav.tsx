import type { ComponentType } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { doSignIn } from '@/lib/actions';
import {
  HomeIcon,
  DumbbellIcon,
  NotebookIcon,
  SyringeIcon,
  FlameIcon,
  GoogleIcon,
} from '@/lib/icons';

type Tab = 'today' | 'train' | 'log' | 'health' | 'fuel';

interface NavItem {
  tab: Tab;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}

const ITEMS: NavItem[] = [
  { tab: 'today', label: 'Today', Icon: HomeIcon },
  { tab: 'train', label: 'Train', Icon: DumbbellIcon },
  { tab: 'log', label: 'Log', Icon: NotebookIcon },
  { tab: 'health', label: 'Health', Icon: SyringeIcon },
  { tab: 'fuel', label: 'Fuel', Icon: FlameIcon },
];

/** Which primary tab the current view belongs to. */
function activeTab(selectedDay: string): Tab | null {
  if (selectedDay === 'today') return 'today';
  if (/^[1-7]$/.test(selectedDay)) return 'train';
  if (selectedDay === 'log') return 'log';
  if (selectedDay === 'health') return 'health';
  if (selectedDay === 'fuel') return 'fuel';
  return null; // 'about' lives outside the primary tabs
}

/** Resolves a tab to the view key it should open. */
function tabTarget(tab: Tab, lastWorkoutDay: string): string {
  return tab === 'train' ? lastWorkoutDay : tab;
}

function useNav() {
  const selectedDay = useAppStore((s) => s.selectedDay);
  const lastWorkoutDay = useAppStore((s) => s.lastWorkoutDay);
  const selectDay = useAppStore((s) => s.selectDay);
  const current = activeTab(selectedDay);
  const go = (tab: Tab) => selectDay(tabTarget(tab, lastWorkoutDay));
  return { current, go };
}

/** Bottom tab bar — mobile / small screens. */
export function BottomNav() {
  const { current, go } = useNav();
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {ITEMS.map(({ tab, label, Icon }) => (
        <button
          key={tab}
          className={'nav-item' + (current === tab ? ' active' : '')}
          onClick={() => go(tab)}
          aria-current={current === tab ? 'page' : undefined}
        >
          <Icon className="nav-item-icon" />
          <span className="nav-item-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}

/** Left sidebar — desktop. Carries the brand and account alongside the tabs. */
export function SideNav() {
  const { current, go } = useNav();
  const user = useAppStore((s) => s.user);
  const toggleAccountMenu = useAppStore((s) => s.toggleAccountMenu);
  const selectDay = useAppStore((s) => s.selectDay);

  return (
    <aside className="side-nav" aria-label="Primary">
      <button
        className="side-brand"
        onClick={() => selectDay('today')}
        aria-label="Home"
      >
        <span className="brand-dot" />
        <span className="brand-word">Training</span>
      </button>

      <div className="side-items">
        {ITEMS.map(({ tab, label, Icon }) => (
          <button
            key={tab}
            className={'side-item' + (current === tab ? ' active' : '')}
            onClick={() => go(tab)}
            aria-current={current === tab ? 'page' : undefined}
          >
            <Icon className="side-item-icon" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="side-account">
        {user ? (
          <button
            className="side-account-btn js-avatar"
            aria-label="Account"
            onClick={toggleAccountMenu}
          >
            {user.photoURL ? (
              <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
            ) : (
              <span className="avatar-fallback">
                {(user.displayName || user.email || '?').trim().charAt(0)}
              </span>
            )}
            <span className="side-account-name">
              {user.displayName || 'Account'}
            </span>
          </button>
        ) : (
          <button className="side-item" onClick={doSignIn}>
            <GoogleIcon />
            <span>Sign in</span>
          </button>
        )}
      </div>
    </aside>
  );
}
