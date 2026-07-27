/*
 * Service worker — deliberately minimal.
 *
 * It caches NOTHING. Firebase Hosting already serves index.html with
 * `no-cache` (see firebase.json) and fingerprints every asset, so a cache-first
 * worker would only fight those headers and start serving stale HTML after a
 * deploy. The fetch handler is a pass-through: it exists because Chrome
 * requires one before it will treat a site as installable.
 *
 * What this buys us today: the app installs to the Home Screen and runs
 * standalone. What it sets up for later: push notifications need a registered
 * worker to deliver into, and this is it — adding FCM means adding a `push`
 * and `notificationclick` handler here, not restructuring the app.
 */

self.addEventListener('install', () => {
  // Don't wait for existing tabs to close before taking over.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', () => {
  // Intentionally empty: no respondWith, so the browser handles the request
  // exactly as it would with no worker installed.
});
