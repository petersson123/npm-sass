const staticCacheName = 'site-static';
const assets = [
    './',
    './index.html',
    './index.js',    
    './bilder/bakgrund.jpg',
    './bilder/fraga1.jpg',
    './bilder/fraga2.jpg',
    './main.css',
    './main.css.map',
    './bootstrap.min.css',
    './script.js',
    './st.html'
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
        })
    );
});