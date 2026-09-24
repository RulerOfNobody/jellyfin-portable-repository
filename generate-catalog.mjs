import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
const root = new URL('./', import.meta.url);
const path = 'packages/v0.1.0-alpha/';
const base = 'https://raw.githubusercontent.com/RulerOfNobody/jellyfin-portable-repository/main/';
const hash = (file, algorithm) => createHash(algorithm).update(readFileSync(new URL(path + file, root))).digest('hex');
for (const [abi, name] of [['10.11.11', 'manifest.json'], ['12.1.0', 'manifest-experimental-12.json']]) {
  const file = `portable-downloads-0.1.0-jellyfin-${abi}.zip`;
  const manifest = [{
    guid: '9ab61945-dd21-43f9-86ec-9c1144374cac',
    name: 'Portable Downloads',
    overview: 'Temporary mobile downloads with per-item size targets.',
    description: `Alpha for Jellyfin ${abi}. H.264, HEVC and AV1 with Jellyfin's configured hardware device, temporary scratch storage and automatic expiry. Download-menu integration requires the separate matching web client. ${abi === '12.1.0' ? 'EXPERIMENTAL: compile-tested only.' : 'Runtime-tested on 10.11.11; physical GPU validation still required.'} Setup: https://github.com/RulerOfNobody/jellyfin-portable-repository`,
    owner: 'RulerOfNobody',
    category: 'General',
    versions: [{
      version: '0.1.0.0',
      changelog: 'Initial alpha. Size sliders, codec/track selection, queued encodes, expiring temporary downloads. Inherits Jellyfin transcoding settings. See repository README for setup and client compatibility.',
      targetAbi: `${abi}.0`,
      sourceUrl: base + path + file,
      checksum: hash(file, 'md5'),
      timestamp: '2026-09-24T05:00:00Z'
    }]
  }];
  writeFileSync(new URL(name, root), JSON.stringify(manifest, null, 2) + '\n');
}
const files = readdirSync(new URL(path, root)).filter(f => f.endsWith('.zip')).sort();
writeFileSync(new URL(path + 'SHA256SUMS', root), files.map(f => `${hash(f, 'sha256')}  ${f}\n`).join(''));
console.log('Generated two separate catalogs and SHA256SUMS.');
