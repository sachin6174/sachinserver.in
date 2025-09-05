/**
 * Service Worker for Advanced Caching Strategy
 * Implements intelligent caching for better performance and offline capability
 */

const CACHE_NAME = 'sachinserver-v1.2.0';
const STATIC_CACHE_NAME = 'sachinserver-static-v1.2.0';
const DYNAMIC_CACHE_NAME = 'sachinserver-dynamic-v1.2.0';
const IMAGE_CACHE_NAME = 'sachinserver-images-v1.2.0';

// Critical resources that should be cached immediately
const CRITICAL_RESOURCES = [
  '/',
  '/manifest.json',
  '/favicon.ico'
];

// Resources to cache on first visit
const STATIC_ASSETS = [
  '/logo192.png',
  '/logo512.png'
];

// Maximum cache sizes
const MAX_CACHE_SIZE = {
  [DYNAMIC_CACHE_NAME]: 50,
  [IMAGE_CACHE_NAME]: 30,
  [STATIC_CACHE_NAME]: 100
};

// Cache duration (in milliseconds)
const CACHE_DURATION = {
  static: 30 * 24 * 60 * 60 * 1000, // 30 days
  dynamic: 7 * 24 * 60 * 60 * 1000,  // 7 days
  images: 14 * 24 * 60 * 60 * 1000   // 14 days
};

/**
 * Install Event - Cache critical resources
 */
self.addEventListener('install', (event) => {
  console.log('SW: Installing service worker');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME)
        .then(cache => {
          console.log('SW: Caching critical resources');
          return cache.addAll(CRITICAL_RESOURCES);
        }),
      caches.open(STATIC_CACHE_NAME)
        .then(cache => {
          console.log('SW: Caching static assets');
          return cache.addAll(STATIC_ASSETS);
        })
    ]).then(() => {
      console.log('SW: Installation complete');
      return self.skipWaiting();
    }).catch(error => {
      console.error('SW: Installation failed', error);
    })
  );
});

/**
 * Activate Event - Clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('SW: Activating service worker');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return !Object.values({
                CACHE_NAME,
                STATIC_CACHE_NAME,
                DYNAMIC_CACHE_NAME,
                IMAGE_CACHE_NAME
              }).includes(cacheName);
            })
            .map(cacheName => {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ]).then(() => {
      console.log('SW: Activation complete');
    })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                // Cache static assets and API responses
                if (event.request.method === 'GET') {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          });
      })
      .catch(() => {
        // Return offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    event.waitUntil(
      // Add your background sync logic here
      Promise.resolve()
    );
  }
});

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/logo192.png',
      badge: '/logo192.png',
      vibrate: [100, 50, 100],
      data: {
        url: data.url
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});
