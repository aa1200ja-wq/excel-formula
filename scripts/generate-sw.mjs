import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const files = []

async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) await walk(full)
    else if (entry.name !== 'sw.js') files.push(`/${path.relative(dist, full).replaceAll(path.sep, '/')}`)
  }
}

await walk(dist)
const uniqueFiles = [...new Set(['/', '/index.html', ...files])]
const source = `const CACHE_NAME = 'excel-formula-first-aid-prod-1.0.3'\nconst PRECACHE = ${JSON.stringify(uniqueFiles, null, 2)}\n\nself.addEventListener('install', (event) => {\n  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()))\n})\n\nself.addEventListener('activate', (event) => {\n  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('excel-formula-first-aid-') && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()))\n})\n\nself.addEventListener('fetch', (event) => {\n  if (event.request.method !== 'GET') return\n  const url = new URL(event.request.url)\n  if (url.origin !== self.location.origin) return\n  if (event.request.mode === 'navigate') {\n    event.respondWith(fetch(event.request).catch(() => caches.match('/index.html')))\n    return\n  }\n  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {\n    if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()))\n    return response\n  })))\n})\n`
await fs.writeFile(path.join(dist, 'sw.js'), source)
console.log(`Generated dist/sw.js with ${uniqueFiles.length} cached files.`)
