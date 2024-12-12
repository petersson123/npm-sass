const staticCacheName = 'site-static';
const assets = [
    './',
    './index.html',
    './index.js',    
    './bilder/background.jpg',
    './bilder/1.jpg',
    './main.css',
    './main.css.map',
    './bootstrap.min.css',
    './script.js',
    './st.html',
    './4.jpg',
];

self.addEventListener('install', evt => {
    console.log('service worker has been installed');
    evt.waitUntil(    
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            return cache.addAll(assets);
        }).catch(error => {
            console.error('Cache addAll failed:', error);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', evt => {
    console.log('service worker has been activated');
    evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            if (cacheRes) {
                return cacheRes.blob().then(body => 
                    new Response(body, {
                        headers: {
                            'Content-Type': cacheRes.headers.get('Content-Type'),
                            'Cache-Control': 'public, max-age=31536000', 
                            'Last-Modified': cacheRes.headers.get('Last-Modified')
                        }
                    })
                );
            }
            return fetch(evt.request);
        }).catch(error => {
            console.error('Fetch failed:', error);
            return fetch(evt.request);
        })
    );
});