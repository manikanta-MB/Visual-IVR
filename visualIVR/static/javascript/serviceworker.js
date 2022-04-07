var cacheName = 'djangopwa-v1';

self.addEventListener('install', function(event) {
	console.log("service worker installed.")
	// event.waitUntil(
	// 	caches.open(cacheName).then(function(cache) {
	// 	return cache.addAll([
	// 		'/home'
	// 	]);
	// 	})
	// );
});

self.addEventListener('activate', function(event) {
	console.log("service worker activated.");
});

self.addEventListener('fetch', e => {
	e.respondWith(
		fetch(e.request)
		.then(res => {
			// Make a clone/copy of response
			const resClone = res.clone()

			// Opening Cache and storing the current response
			caches.open(cacheName)
			.then(cache => {
				cache.put(e.request,resClone);
			});
			return res;
		})
		.catch(err => caches.match(e.request).then(res => res))
	);
});
