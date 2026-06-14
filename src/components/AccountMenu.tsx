import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { signOut } from '@/firebase/auth';
import { toast } from '@/store/toastStore';

export function AccountMenu() {
  const user = useAppStore((s) => s.user);
  const open = useAppStore((s) => s.accountMenuOpen);
  const closeAccountMenu = useAppStore((s) => s.closeAccountMenu);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click (but not when clicking the avatar that toggles it).
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !target.closest('.js-avatar')
      ) {
        closeAccountMenu();
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open, closeAccountMenu]);

  const onSignOut = async () => {
    closeAccountMenu();
    const err = await signOut();
    toast(err ?? 'Signed out', err ? 'error' : '');
  };

  return (
    <div className={'account-menu' + (open ? ' open' : '')} ref={menuRef}>
      <div className="account-name">{user?.displayName || 'Signed in'}</div>
      <div className="account-email">{user?.email || ''}</div>
      <button className="account-signout" onClick={onSignOut}>
        Sign out
      </button>
    </div>
  );
}
