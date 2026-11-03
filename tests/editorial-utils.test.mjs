import test from 'node:test';
import assert from 'node:assert/strict';
import { SANITY_PAGE_MAP, isApprovedRoute, cleanEditorialText, overlayEditorial } from '../lib/editorial-utils.mjs';

const fallback = { title: 'Company', kicker: 'OUR PERSPECTIVE', lead: 'Local introduction', body: 'Local body', image: '/images/a.webp', points: ['A','B','C'] };
const document = { _type: 'page', slug: { current: 'about' }, title: 'About Centauri', hero: { eyebrow: 'CENTAURI RENEWABLE CORPORATION', subheadline: 'Verified approved overview' }, sections: [{ _type: 'cinematicScene', body: 'Governance and systems' }] };

test('CMS is opt-in and route approval is explicit', () => {
  assert.equal(isApprovedRoute('company', undefined, 'company'), false);
  assert.equal(isApprovedRoute('company', 'true', ''), false);
  assert.equal(isApprovedRoute('company', 'true', 'company'), true);
  assert.equal(isApprovedRoute('space', 'true', 'company'), false);
  assert.equal(isApprovedRoute('__proto__', 'true', '__proto__'), false);
  assert.equal(SANITY_PAGE_MAP['company'], 'about');
});

test('a matching published document overlays plain text without overriding safe route data', () => {
  const item = overlayEditorial('company', fallback, document);
  assert.equal(item.title, 'About Centauri');
  assert.equal(item.body, 'Governance and systems');
  assert.equal(item.image, fallback.image);
  assert.deepEqual(item.points, fallback.points);
});

test('mismatched or unapproved document identity never replaces the page', () => {
  assert.equal(overlayEditorial('company', fallback, { ...document, slug: { current: 'space' } }), fallback);
  assert.equal(overlayEditorial('company', fallback, { ...document, _type: 'secret' }), fallback);
  assert.equal(overlayEditorial('markets', fallback, document), fallback);
});

test('CMS strings are bounded and control characters removed', () => {
  assert.equal(cleanEditorialText('  Hello\n  world  ', 100), 'Hello world');
  assert.equal(cleanEditorialText('X'.repeat(900), 80).length, 80);
  assert.equal(cleanEditorialText({ dangerous: true }), null);
});
