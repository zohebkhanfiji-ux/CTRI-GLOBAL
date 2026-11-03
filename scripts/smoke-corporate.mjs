import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { pages } from '../app/site-data.js';
import { corporateIdentity } from '../lib/corporate-identity.mjs';

const server = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'start', '--', '--hostname', '127.0.0.1', '--port', '3100'], { stdio: 'inherit', detached: process.platform !== 'win32' });
const base = 'http://127.0.0.1:3100';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null) throw new Error('Application server exited before smoke tests');
    try { ready = (await fetch(base, { signal: AbortSignal.timeout(1000) })).ok; } catch {}
    if (ready) break;
    await delay(500);
  }
  assert.ok(ready, 'Production server must start');
  const paths = ['/', ...Object.keys(pages).map(slug => '/explore/' + slug)];
  for (const path of paths) {
    const response = await fetch(base + path, { signal: AbortSignal.timeout(10000) });
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get('x-robots-tag') || '', /noindex/);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    const html = await response.text();
    assert.ok(html.includes(corporateIdentity.name), path + ' company identity');
    assert.doesNotMatch(html, /CTRI Global|CTRI GLOBAL|Centauri Renewables Corporation/, path);
    assert.ok(html.includes('https://www.ctriglobal.com'), path + ' canonical site');
    if (path === '/') assert.ok(html.includes('<title>' + corporateIdentity.name + '</title>'));
    if (path === '/explore/manufacturing') {
      assert.match(html, /nickel-hydrogen/i);
      assert.match(html, /selenium/i);
      assert.match(html, /Energy America/);
    }
    console.log('PASS ' + path);
  }
  const robots = await fetch(base + '/robots.txt');
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Disallow: \//);
  for (const path of ['/explore/not-a-real-page', '/explore/__proto__']) {
    assert.equal((await fetch(base + path)).status, 404, path);
  }
  console.log('PASS: 25 content routes, corporate naming, canonical host, security headers, robots and 404 checks');
} finally {
  if (server.pid) {
    try { process.platform === 'win32' ? server.kill('SIGTERM') : process.kill(-server.pid, 'SIGTERM'); } catch {}
  }
}
