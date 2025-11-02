const CACHE_NAME = "pomodoro-v1";

// Detectar o caminho base do projeto (funciona tanto local quanto GitHub Pages)
const getBasePath = () => {
  const path = self.location.pathname;
  // Se o service worker está em /src/service-worker.js, remover isso para obter o base
  if (path.endsWith('/src/service-worker.js')) {
    return path.replace('/src/service-worker.js', '');
  }
  return '';
};

const basePath = getBasePath();
const urlsToCache = [
  basePath + "/index.html",
  basePath + "/src/style.css",
  basePath + "/src/script.js",
  basePath + "/src/manifest.json"
].filter(Boolean); // Remove strings vazias

// Instalar Service Worker e cachear recursos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Cache aberto");
        // Tentar adicionar todos, mas continuar mesmo se alguns falharem
        return cache.addAll(urlsToCache).catch((error) => {
          console.log("Alguns recursos não puderam ser cacheados:", error);
        });
      })
  );
  // Forçar ativação imediata do novo service worker
  self.skipWaiting();
});

// Interceptar requisições e servir do cache quando offline
self.addEventListener("fetch", (event) => {
  // Ignorar requisições que não são GET
  if (event.request.method !== "GET") {
    return;
  }
  
  // Ignorar requisições para APIs externas (Bootstrap, Font Awesome, etc)
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retornar do cache se disponível, senão buscar na rede
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          // Só cachear respostas válidas
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }
          // Clonar a resposta para cachear
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
      .catch(() => {
        // Se tudo falhar, tentar buscar da rede
        return fetch(event.request);
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
  // Tomar controle imediato de todas as páginas
  return self.clients.claim();
});
  