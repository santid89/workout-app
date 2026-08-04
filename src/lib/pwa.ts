/**
 * Registers the service worker so the app can be installed to a phone's Home
 * Screen and run standalone (see public/sw.js — it caches nothing).
 *
 * Dev is skipped on purpose: a worker sitting in front of the Vite dev server
 * makes hot reload behave unpredictably, and there's nothing to gain from it.
 */
export function registerServiceWorker(): void {
  if (!import.meta.env.PROD) return;
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((e) => {
      // Non-fatal: the app works fine uninstalled.
      console.warn('[Workout app] Service worker not registered:', e);
    });
  });
}
