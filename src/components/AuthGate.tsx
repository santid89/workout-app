import { GoogleIcon } from '@/lib/icons';
import { doSignIn } from '@/lib/actions';

/**
 * Full-screen login gate. Visibility is driven by the body classes set in
 * useAuth (auth-loading / signed-out / signed-in), matching the original CSS.
 */
export function AuthGate() {
  return (
    <div className="auth-gate" id="authGate">
      <div className="auth-gate-inner">
        <div className="gate-mark">
          <span className="gate-dot" />
        </div>
        <h1 className="gate-title">Training</h1>
        <p className="gate-tagline">
          Your strength &amp; cycling program — and a private log of every
          session you actually complete.
        </p>
        <div className="gate-spinner" aria-label="Loading" />
        <button className="gate-signin" onClick={doSignIn}>
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>
        <p className="gate-fine">
          Sign in with Google. Your workout history syncs to your account, on
          every device.
        </p>
      </div>
    </div>
  );
}
