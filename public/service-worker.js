const addResourcesToCache = async (resources) => {
	const cache = await caches.open('v1')
	await cache.addAll(resources)
}

self.addEventListener('install', (event) => {
	event.waitUntil(
		addResourcesToCache(['/', '/static/index.html', '/entry.css', '/entry.js']),
	)
})

self.addEventListener('activate', (event) => {
	event.waitUntil(self.registration?.navigationPreload.enable())
})

const putInCache = async (request, response) => {
	const cache = await caches.open('v1')
	await cache.put(request, response)
}

const networkFirst = async (request) => {
	try {
		const responseFromNetwork = await fetch(request)
		putInCache(request, responseFromNetwork.clone())
		return responseFromNetwork
	} catch {
		return caches.match(request)
	}
}

self.addEventListener('fetch', (event) => {
	event.respondWith(networkFirst(event.request))
})

// Register event listener for the 'push' event.
self.addEventListener('push', (event) => {
	event.waitUntil(
		self.registration.showNotification('ServiceWorker Cookbook', {
			body: 'Alea iacta est',
		}),
	)
})
