const VERSION="v6-icons-nofx";
const IMG_CACHE="wc-img-"+VERSION;
self.addEventListener("install",e=>{self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==IMG_CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
// Only photos are cached (cache-first, filled as they are viewed). HTML/API always go to the network so updates and weather stay fresh.
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);
 if(e.request.method==="GET"&&u.origin===location.origin&&/\/img\/.*\.jpg$/.test(u.pathname)){
  e.respondWith(caches.open(IMG_CACHE).then(c=>c.match(e.request).then(h=>h||fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}))));
 }
});
