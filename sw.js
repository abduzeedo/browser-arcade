const CACHE='arcade-app-v2';
const ASSETS=[
  "./controls-core.js",
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./data/LICENSE",
  "./data/SOURCES.md",
  "./data/UPSTREAM-README.md",
  "./data/compression/extract7z.js",
  "./data/compression/extractzip.js",
  "./data/cores/fceumm-legacy-wasm.data",
  "./data/cores/fceumm-wasm.data",
  "./data/cores/gambatte-legacy-wasm.data",
  "./data/cores/gambatte-wasm.data",
  "./data/cores/genesis_plus_gx-legacy-wasm.data",
  "./data/cores/genesis_plus_gx-wasm.data",
  "./data/cores/mgba-legacy-wasm.data",
  "./data/cores/mgba-wasm.data",
  "./data/cores/reports/fceumm.json",
  "./data/cores/reports/gambatte.json",
  "./data/cores/reports/genesis_plus_gx.json",
  "./data/cores/reports/mgba.json",
  "./data/cores/reports/smsplus.json",
  "./data/cores/reports/snes9x.json",
  "./data/cores/smsplus-legacy-wasm.data",
  "./data/cores/smsplus-wasm.data",
  "./data/cores/snes9x-legacy-wasm.data",
  "./data/cores/snes9x-wasm.data",
  "./data/emulator.min.css",
  "./data/emulator.min.js",
  "./data/loader.js",
  "./data/version.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
  "./icons/favicon-16.png"
];
const allowed=new Set(ASSETS.map(path=>new URL(path,self.registration.scope).href));
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)))});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('arcade-app-')&&key!==CACHE)await caches.delete(key);await self.clients.claim()})())});
self.addEventListener('fetch',event=>{const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 if(request.mode==='navigate'&&(url.pathname===new URL('./',self.registration.scope).pathname||url.pathname===new URL('./index.html',self.registration.scope).pathname)){event.respondWith((async()=>{try{const response=await fetch(request);if(response.ok)return response}catch{}return (await caches.match(new URL('./index.html',self.registration.scope)))||Response.error()})());return}
 if(!allowed.has(url.href))return;
 event.respondWith((async()=>{const cached=await caches.match(request);if(cached)return cached;const response=await fetch(request);if(response.ok){const cache=await caches.open(CACHE);await cache.put(request,response.clone())}return response})())
});
