/* ═══════════════════════════════════════════════════
 * WealthWaffle — Service Worker v3
 * Nouvelle architecture dossiers (juin 2026)
 * Stratégie : Cache-first pour assets, Network-first pour pages
 * ═══════════════════════════════════════════════════ */

const CACHE_VERSION = 'ww-v3';
const CACHE_ASSETS  = 'ww-assets-v3';

/* Assets statiques — mis en cache à l'installation */
const STATIC_ASSETS = [
  '/assets/ww-all.css',
  '/assets/ww-bundle.js',
  '/assets/data.js',
  '/assets/tools.js',
  '/assets/search-index.js',
  '/IMG_5202.png',
  '/manifest.json'
];

/* Pages prioritaires — pré-cachées */
const STATIC_PAGES = [
  '/',
  '/index.html',
  '/budget/',
  '/invest/',
  '/immo/',
  '/fiscal/',
  '/outils/',
  '/parcours/',
  '/404.html'
];

/* ── Installation ── */
self.addEventListener('install', e => {
  e.waitUntil(
    Promise.all([
      caches.open(CACHE_ASSETS).then(c =>
        c.addAll(STATIC_ASSETS).catch(err => console.warn('[SW] Asset cache partial:', err))
      ),
      caches.open(CACHE_VERSION).then(c =>
        c.addAll(STATIC_PAGES).catch(err => console.warn('[SW] Page cache partial:', err))
      )
    ])
  );
  self.skipWaiting();
});

/* ── Activation — purge des anciens caches ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_VERSION && k !== CACHE_ASSETS)
          .map(k => { console.log('[SW] Purge ancien cache:', k); return caches.delete(k); })
      )
    )
  );
  self.clients.claim();
});

/* ── Interception des requêtes ── */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  /* 1. Assets statiques (CSS, JS, images) → Cache-first */
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.match(/\.(css|js|png|jpg|webp|woff2|svg)$/)
  ) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_ASSETS).then(c => c.put(e.request, clone));
          }
          return res;
        });
      })
    );
    return;
  }

  /* 2. Pages HTML → Network-first, fallback cache, fallback 404 */
  if (
    e.request.headers.get('accept')?.includes('text/html') ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('/')
  ) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_VERSION).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() =>
          caches.match(e.request)
            .then(cached => cached || caches.match('/404.html'))
        )
    );
    return;
  }

  /* 3. Reste (API Supabase, Stripe, fonts) → Network only */
  e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503 })));
});

/* ── Message du client (force refresh) ── */
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
