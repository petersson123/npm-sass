const staticCacheName = 'site-static';
const assets = [
    '/npm-sass/',
    '/npm-sass/index.html',
    '/npm-sass/index.js',
    '/npm-sass/bilder/bakgrund.jpg',
    '/npm-sass/bilder/fraga1.jpg',
    '/npm-sass/bilder/fraga2.jpg',
    '/npm-sass/main.css',
    '/npm-sass/main.css.map',
    '/npm-sass/bootstrap.min.css'
];

self.addEventListener('install', evt => {
    console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            return cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', evt => {
    console.log('service woker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== staticCacheName)
                    .map(key => caches.delete(key))
            )
        })
    );
});

self.addEventListener('fetch', evt => {
    console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});