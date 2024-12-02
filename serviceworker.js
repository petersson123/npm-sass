const staticCacheName = 'site-static'
const assets = [
    '/',
    '/index.html',
    '/index.js',
    '/main.css',
    '/main.css.map',
    '/bootstrap.min.css',
    '/bilder/bakgrund.jpg',
    '/bilder/fraga1.jpg',
    '/bilder/fraga2.jpg'

];

self.addEventListener('install', evt => {
    console.log('service worker has been installed');
    evt.waitUntil(    
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});



self.addEventListener('activate', evt => {
    console.log('service woker has been activated');
});



self.addEventListener('fetch', evt => {
    console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});