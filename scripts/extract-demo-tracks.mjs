/**
 * Extract full-detail patrol track segments from LPYE_Tracks-2.geojson.
 * Run: node scripts/extract-demo-tracks.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const LAT_OFF = -0.020131;
const LNG_OFF = 0.064319;
const toRaw = (lat, lng) => [+(lat - LAT_OFF).toFixed(6), +(lng - LNG_OFF).toFixed(6)];

const sel = JSON.parse(fs.readFileSync(path.join(root, 'public/LPYE_Selection.json'), 'utf8'));
const blocks = (sel.data || sel).features.map((f) => {
  const ring = f.geometry.coordinates[0];
  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
  ring.forEach(([lng, lat]) => {
    minLng = Math.min(minLng, lng); maxLng = Math.max(maxLng, lng);
    minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat);
  });
  return { blok: f.properties?.blok, minLng, maxLng, minLat, maxLat };
});

function nearestPair(lat, lng) {
  const n = blocks.map((b) => {
    const dx = Math.max(b.minLng - lng, 0, lng - b.maxLng);
    const dy = Math.max(b.minLat - lat, 0, lat - b.maxLat);
    return { b, d: Math.hypot(dx, dy) };
  }).sort((a, b) => a.d - b.d);
  const a = n[0].b.blok, b = n[1].b.blok;
  return a !== b ? `${a}↔${b}` : a;
}

function maxJump(lls) {
  let m = 0;
  for (let i = 1; i < lls.length; i++) {
    m = Math.max(m, Math.hypot(lls[i][0] - lls[i - 1][0], lls[i][1] - lls[i - 1][1]));
  }
  return m;
}

const tracks = JSON.parse(fs.readFileSync(path.join(root, 'public/LPYE_Tracks-2.geojson'), 'utf8'));

function segmentFromCoords(coords, start, len) {
  const seg = coords.slice(start, start + len);
  const lls = seg.map(([lng, lat]) => [lat, lng]);
  if (maxJump(lls) > 0.0008) return null;
  const mid = lls[Math.floor(lls.length / 2)];
  return {
    start,
    len: seg.length,
    pair: nearestPair(mid[0], mid[1]),
    track: seg.map(([lng, lat]) => toRaw(lat, lng)),
  };
}

function bestForJalur(coords) {
  // Utamakan seluruh jalur (koordinat manual penuh dari geojson)
  const full = segmentFromCoords(coords, 0, coords.length);
  if (full && full.len >= 8) return full;
  // Fallback: segmen terpanjang
  let best = null;
  for (let len = coords.length; len >= 8; len--) {
    for (let start = 0; start <= coords.length - len; start++) {
      const c = segmentFromCoords(coords, start, len);
      if (c && (!best || c.len > best.len)) best = c;
    }
    if (best) break;
  }
  return best;
}

// Satu entry per Jalur — pakai SEMUA titik koordinat asli
const routes = [];
for (const f of tracks.features) {
  const coords = f.geometry.coordinates;
  if (coords.length < 8) continue;
  const seg = bestForJalur(coords);
  if (!seg) continue;
  routes.push({ ...seg, jalur: f.properties?.name || 'Jalur' });
}
routes.sort((a, b) => b.len - a.len);

const speeds = routes.map((r) => {
  const mid = Math.floor(r.track.length / 2);
  const span = Math.min(14, Math.floor(r.track.length / 3));
  return {
    pair: r.pair,
    jalur: r.jalur,
    track: r.track.slice(Math.max(0, mid - span), Math.min(r.track.length, mid + span)),
  };
});

function fmt(track) {
  return track.map((p) => `[${p[0]},${p[1]}]`).join(',');
}

let out = `// AUTO-GENERATED — node scripts/extract-demo-tracks.mjs\n`;
out += `// Koordinat penuh dari LPYE_Tracks-2.geojson (jalur patrol manual)\n\n`;
out += `export type CorridorDef = { pair: string; jalur: string; track: [number, number][] }\n\n`;
out += `export const ROUTE_CORRIDORS: CorridorDef[] = [\n`;
routes.forEach((r) => {
  out += `  { pair: '${r.pair}', jalur: '${r.jalur}', track: [${fmt(r.track)}] },\n`;
});
out += `]\n\nexport const SPEED_CORRIDORS: CorridorDef[] = [\n`;
speeds.forEach((r) => {
  out += `  { pair: '${r.pair}', jalur: '${r.jalur}', track: [${fmt(r.track)}] },\n`;
});
out += `]\n`;

const outPath = path.join(root, 'lib/demo-track-segments.ts');
fs.writeFileSync(outPath, out);
console.log(`Wrote ${outPath}`);
routes.forEach((r, i) => console.log(`  R${i + 1} ${r.jalur} ${r.pair} — ${r.len} titik`));
speeds.forEach((r, i) => console.log(`  S${i + 1} ${r.jalur} ${r.pair} — ${r.track.length} titik`));
