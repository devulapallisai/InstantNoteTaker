const assets = [
  "/",
  "sw-register.js",
  "serviceworker.js",
  "/Note.html",
  "/about.html",
  "/Suggest.html",
  "css/style.css",
  "css/styleabout.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
  "https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js",
  "https://fonts.googleapis.com/css2?family=Baloo+Bhai+2&display=swap",
  "css/stylenote.css",
  "css/stylesuggest.css",
  "javascript/index.js",
  "javascript/Note.js",
  "attachments/slid.jpg",
  "attachments/1.jpg",
  "attachments/aa.jpg",
  "attachments/ap.jpg",
  "attachments/ba.jpg",
  "attachments/gg.jpg",
  "attachments/ff.jpg",
  "attachments/cool.jpg",
  "attachments/download.jpg",
  "attachments/oo.jpg",
  "attachments/p.jpg",
  "attachments/pa.jpg",
  "attachments/pp.jpg",
  "attachments/q.jpg",
  "attachments/j.jpg",
  "attachments/kk.jpg",
  "attachments/l.jpeg",
  "attachments/ll.jpg",
  "attachments/n.jpg",
  "attachments/No.jpg",
];
self.addEventListener("install", (event) => {
  caches.open("assets").then((cache) => {
    cache.addAll(assets);
  });
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Even if the response is in the cache, we fetch it
      // and update the cache for future usage
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open("assets").then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
      // We use the currently cached version if it's there
      return cachedResponse || fetchPromise; // cached or a network fetch
    })
  );
});
