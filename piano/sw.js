// Piano Ayden: lưu sẵn app để mở được khi không có mạng
const TEN = "piano-ayden-v7";
const FILE = ["./", "index.html", "manifest.json", "icon-180.png", "icon-192.png", "icon-512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"];
self.addEventListener("install", e => { e.waitUntil(caches.open(TEN).then(c => c.addAll(FILE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== TEN).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  // mạng trước (để có bản mới), mất mạng thì lấy bản đã lưu
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(TEN).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
});
