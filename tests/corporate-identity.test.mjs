import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateIdentity, manufacturingLines, productReleaseNotice } from '../lib/corporate-identity.mjs';
import { pages, groups } from '../app/site-data.js';
const text = p => readFileSync(new URL('../' + p, import.meta.url), 'utf8');

test('exact main-company name and existing domain are authoritative', () => {
  assert.equal(corporateIdentity.name, 'Centauri Renewable Corporation');
  assert.equal(corporateIdentity.acronym, 'CRC');
  assert.equal(corporateIdentity.siteUrl, 'https://www.ctriglobal.com');
});
test('manufacturing, operations, customer experience and central R&D remain distinct', () => {
  assert.equal(corporateIdentity.manufacturer, 'Energy America');
  assert.equal(corporateIdentity.researchAuthority, 'Centauri Labs');
  assert.equal(corporateIdentity.operationsManager, 'EA-VOLT');
  assert.equal(corporateIdentity.customerExperience, 'AD ASTRA');
  assert.match(pages['centauri-labs'].lead, /all operations/);
});
test('all three requested manufacturing areas and release qualifications are present', () => {
  assert.deepEqual(manufacturingLines.map(x => x.title), ['Solar modules', 'Nickel-hydrogen BESS', 'Selenium solar cells and modules']);
  assert.match(pages.manufacturing.body, /NASA-origin selenium-interlayer/);
  assert.match(productReleaseNotice, /does not imply NASA endorsement/);
  assert.match(productReleaseNotice, /product-specific technical and contractual evidence/);
});
test('all existing routes plus manufacturing and Labs are uniquely linked', () => {
  const routes = groups.flatMap(g => g.items);
  assert.equal(Object.keys(pages).length, 24);
  assert.equal(new Set(routes).size, routes.length);
  assert.deepEqual([...routes].sort(), Object.keys(pages).sort());
  for (const item of Object.values(pages)) assert.equal(item.points.length, 3);
});
test('rendered copy and metadata do not retain the retired site display name', () => {
  for (const p of ['app/page.js', 'app/layout.js', 'app/site-data.js', 'app/explore/[slug]/page.js', 'components/site-header.js']) {
    assert.doesNotMatch(text(p), /CTRI\s+GLOBAL|CTRI\s+Global|Centauri Renewables Corporation/, p);
  }
  assert.match(text('app/layout.js'), /siteName: corporateIdentity.name/);
  assert.match(text('components/site-header.js'), /RENEWABLE CORPORATION/);
});
test('indexing and private-editorial approval gates remain unchanged', () => {
  assert.match(text('app/layout.js'), /index: false, follow: false/);
  assert.match(text('app/robots.js'), /disallow: '\/'/);
  assert.match(text('next.config.mjs'), /noindex, nofollow, noarchive/);
  assert.match(text('lib/sanity-editorial.js'), /CTRI_SANITY_EDITORIAL_ENABLED/);
  assert.match(text('lib/sanity-editorial.js'), /CTRI_SANITY_APPROVED_ROUTES/);
});
