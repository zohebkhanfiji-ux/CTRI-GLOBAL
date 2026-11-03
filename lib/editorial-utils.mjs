/**
 * CTRI editorial normalization. The existing local routes stay authoritative
 * until a corporate editor has explicitly approved each Sanity route.
 * Never trust a CMS slug as an arbitrary navigation or fetch URL.
 */
export const SANITY_PAGE_MAP = Object.freeze({
  company: 'about',
  infrastructure: 'infrastructure',
  space: 'space',
});

export function isApprovedRoute(slug, enabled, allowed) {
  if (enabled !== 'true' || !Object.prototype.hasOwnProperty.call(SANITY_PAGE_MAP, slug)) return false;
  return (allowed || '').split(',').map(s => s.trim()).filter(Boolean).includes(slug);
}

export function cleanEditorialText(value, maxLength = 320) {
  if (typeof value !== 'string') return null;
  const clean = value.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
  return clean ? clean.slice(0, maxLength) : null;
}

export function overlayEditorial(slug, fallback, document) {
  if (!fallback || !document || document._type !== 'page' ||
      document.slug?.current !== SANITY_PAGE_MAP[slug]) return fallback;
  const hero = document.hero || {};
  const scene = Array.isArray(document.sections)
    ? document.sections.find(s => s?._type === 'cinematicScene' && typeof s.body === 'string')
    : null;
  return {
    ...fallback,
    title: cleanEditorialText(document.title, 100) || fallback.title,
    kicker: cleanEditorialText(hero.eyebrow, 100) || fallback.kicker,
    lead: cleanEditorialText(hero.subheadline, 320) || fallback.lead,
    body: cleanEditorialText(scene?.body, 1600) || fallback.body,
  };
}
