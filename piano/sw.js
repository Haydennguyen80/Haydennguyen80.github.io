// Piano Ayden: lưu sẵn app để mở được khi không có mạng
const TEN = "piano-ayden-v8";
const FILE = ["./", "index.html", "manifest.json", "icon-180.png", "icon-192.png", "icon-512.png", "not/danh-sach.json", "am/A1.mp3", "am/A2.mp3", "am/A3.mp3", "am/A4.mp3", "am/A5.mp3", "am/A6.mp3", "am/C1.mp3", "am/C2.mp3", "am/C3.mp3", "am/C4.mp3", "am/C5.mp3", "am/C6.mp3", "am/C7.mp3", "am/Ds1.mp3", "am/Ds2.mp3", "am/Ds3.mp3", "am/Ds4.mp3", "am/Ds5.mp3", "am/Ds6.mp3", "am/Fs1.mp3", "am/Fs2.mp3", "am/Fs3.mp3", "am/Fs4.mp3", "am/Fs5.mp3", "am/Fs6.mp3",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"];
self.addEventListener("install", e => { e.waitUntil(caches.open(TEN).then(c => c.addAll(FILE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== TEN).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  // mạng trước (để có bản mới), mất mạng thì lấy bản đã lưu
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(TEN).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
});
