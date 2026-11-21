import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { getPreviewSitemap, getCorporateSchema, getIndexingReadiness } from '../lib/seo-contracts.mjs';
import { pages } from '../app/site-data.js';

test('preview SEO sitemap lists all corporate and 27 editorial pages without new-domain migration', () => {
  const sitemap=getPreviewSitemap();
  assert.equal(sitemap.length,Object.keys(pages).length+4);
  assert.equal(new Set(sitemap.map(x=>x.url)).size,sitemap.length);
  assert.ok(sitemap.every(x=>x.url.startsWith('https://www.ctriglobal.com')));
  assert.ok(sitemap.some(x=>x.url.endsWith('/solutions')));
  assert.ok(sitemap.some(x=>x.url.endsWith('/contact')));
  assert.ok(sitemap.some(x=>x.url.endsWith('/explore/mutual-moon')));
  assert.ok(sitemap.every(x=>!x.url.includes('ctricorp.com')));
});

test('schema uses verified company name without unsupported affiliation',()=>{
  const schema=getCorporateSchema();
  assert.deepEqual(schema['@graph'].map(g=>g['@type']),['Organization','WebSite']);
  assert.ok(schema['@graph'].every(g=>g.name==='Centauri Renewables Corporation'));
  assert.doesNotMatch(JSON.stringify(schema),/NASA|DoD|government|ctricorp\.com/i);
  const readiness=getIndexingReadiness();
  assert.equal(readiness.publicIndexingEnabled,false);
  assert.equal(readiness.migrationReady,false);
  assert.equal(readiness.googleSearchConsoleVerified,false);
  assert.equal(readiness.bingWebmasterVerified,false);
});

test('structured search identity is wired while search indexing remains disabled',()=>{
  const code=readFileSync(new URL('../app/layout.js',import.meta.url),'utf8');
  assert.match(code,/getCorporateSchema\(\)/);
  assert.match(code,/application\/ld\+json/);
  assert.match(code,/index: false, follow: false/);
});
