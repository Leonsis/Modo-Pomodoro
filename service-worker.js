const CACHE_NAME = "pomodoro-v1";

// Detectar o caminho base do projeto (funciona tanto local quanto GitHub Pages)
const getBasePath = () => {
  const path = self.location.pathname;
  // Se o service worker está na raiz (service-worker.js), detectar o base path
  if (path.endsWith('/service-worker.js')) {
    return path.replace('/service-worker.js', '');
  }
  // Se está na raiz, retornar vazio
  if (path === '/' || path === '/service-worker.js') {
    return '';
  }
  // Extrair o caminho base (ex: /Modo-Pomodoro)
  const parts = path.split('/').filter(Boolean);
  if (parts.length > 0 && parts[parts.length - 1] === 'service-worker.js') {
    parts.pop(); // Remove service-worker.js
  }
  return parts.length > 0 ? '/' + parts.join('/') : '';
};

const basePath = getBasePath();
const rootUrl = basePath || '/';

const urlsToCache = [
  rootUrl + (rootUrl.endsWith('/') ? '' : '/') + 'index.html',
  rootUrl + (rootUrl.endsWith('/') ? '' : '/') + 'src/style.css',
  rootUrl + (rootUrl.endsWith('/') ? '' : '/') + 'src/script.js',
  rootUrl + (rootUrl.endsWith('/') ? '' : '/') + 'src/manifest.json'
];

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
  
  const url = new URL(event.request.url);
  
  // Ignorar requisições para APIs externas (Bootstrap, Font Awesome, etc)
  if (url.origin !== location.origin) {
    return;
  }

  // Redirecionar requisições para a raiz para index.html
  const requestUrl = url.pathname;
  let cacheUrl = event.request.url;
  
  if (requestUrl === rootUrl || requestUrl === rootUrl + '/') {
    cacheUrl = new URL(rootUrl + (rootUrl.endsWith('/') ? 'index.html' : '/index.html'), url.origin).href;
  }

  event.respondWith(
    caches.match(cacheUrl)
      .then((response) => {
        // Retornar do cache se disponível
        if (response) {
          return response;
        }
        
        // Buscar da rede
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
        }).catch(() => {
          // Se a requisição falhar e for para a raiz, tentar servir index.html do cache
          if (requestUrl === rootUrl || requestUrl === rootUrl + '/') {
            return caches.match(cacheUrl);
          }
          throw new Error('Network error');
        });
      })
      .catch(() => {
        // Última tentativa: buscar da rede
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

