const CACHE_NAME = "pomodoro-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/src/style.css",
  "/src/script.js",
  "/src/manifest.json"
];

// Instalar Service Worker e cachear recursos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Cache aberto");
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar requisições e servir do cache quando offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retornar do cache se disponível, senão buscar na rede
        return response || fetch(event.request);
      })
  );
});

// Atualizar cache quando nova versão estiver disponível
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Removendo cache antigo:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
  