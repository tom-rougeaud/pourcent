/* Pourcentage XP — service worker
   À déposer à côté du fichier HTML quand il est hébergé (GitHub Pages, ENT).
   Il met la page en cache pour qu'elle s'ouvre hors connexion et devienne installable. */
const CACHE='pxp-v4';
const FICHIERS=['./','./POURCENT-XP-v4.html'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FICHIERS).catch(()=>{})).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(
    fetch(e.request).then(r=>{ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); return r; })
    .catch(()=>caches.match(e.request).then(r=>r||caches.match('./')))
  );
});
