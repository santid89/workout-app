import { CONFIGURED } from '@/firebase/config';
import { signIn as fbSignIn } from '@/firebase/auth';
import { useAppStore } from '@/store/useAppStore';
import { toast } from '@/store/toastStore';

/**
 * App-level sign-in: mirrors the original's behavior of nudging the user to the
 * Log tab when Firebase isn't connected, otherwise running the auth flow and
 * surfacing any error as a toast.
 */
export async function doSignIn(): Promise<void> {
  if (!CONFIGURED) {
    toast("Firebase isn't connected yet — see the Log tab", 'error');
    useAppStore.getState().selectDay('log');
    return;
  }
  const err = await fbSignIn();
  if (err) toast(err, 'error');
}
