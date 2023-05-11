const CACHE_NAME = 'PWA Refri';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/img/72.png',
  '/img/92.png',
  '/img/128.png',
  '/img/144.png',
  '/img/196.png',
  '/img/256.png',
  '/img/512.png',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
