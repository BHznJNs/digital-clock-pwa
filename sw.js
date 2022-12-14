const cacheName = "digitalClock-v1"
const appShellFiles = [
    "./", "./index.html",
    "./script/main.js",
    "./script/NoSleep.js/index.js",
    "./script/NoSleep.js/media.js",
    "./script/register.js",
    "./style/style.css",
    "./style/color.css",
    "./assets/dark.svg",
    "./assets/light.svg",
    "./assets/favicon.png",
    "./assets/manifest.json",
    "./assets/font/DS-DIGIB.TTF",
    "./assets/githubIcons/dark.svg",
    "./assets/githubIcons/light.svg",
]

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Installing...")
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName)
        console.log("[Service Worker] Caching all: app shell and content")
        await cache.addAll(appShellFiles)
        console.log("[Service Worker] Installed all")
    })())
})
self.addEventListener("activate", (e) => {
    console.log("[Service Worker] Activated")
})
// 拦截 fetch 操作
self.addEventListener("fetch", (e) => {
    const target = e.request
    if (caches.match(target)) {
        e.respondWith(caches.match(target))
        console.log(`[Service Worker] Used cached ${target.url} to response request`)
    } else {
        e.respondWith(fetch(target))
        console.log(`[Service Worker] Fetching ${target.url}`)
    }
})