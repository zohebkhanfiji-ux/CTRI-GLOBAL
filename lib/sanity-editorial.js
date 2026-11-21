import { SANITY_PAGE_MAP, isApprovedRoute, overlayEditorial } from './editorial-utils.mjs';

/**
 * Published-only, server-side Sanity reading. This module is imported exclusively
 * from Next.js server routes; no token is imported into client components.
 * Disabled by default. Missing CMS access always falls back to reviewed local text.
 */
export async function getEditorialPage(slug, fallback) {
  if (!fallback || !isApprovedRoute(
    slug, process.env.CTRI_SANITY_EDITORIAL_ENABLED, process.env.CTRI_SANITY_APPROVED_ROUTES
  )) return fallback;

  const project = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '';
  if (!/^[a-z0-9-]+$/.test(project) || !/^[a-z0-9_-]+$/.test(dataset)) return fallback;

  const url = new URL(`https://${project}.api.sanity.io/v2025-02-19/data/query/${dataset}`);
  url.searchParams.set('query',
    '*[_type == "page" && slug.current == $slug][0]{_type,title,slug,hero{eyebrow,subheadline},sections[]{_type,body}}');
  url.searchParams.set('$slug', JSON.stringify(SANITY_PAGE_MAP[slug]));

  const headers = {};
  // Optional access to a private dataset. Never use NEXT_PUBLIC_ for this secret.
  if (process.env.SANITY_READ_TOKEN) headers.Authorization = `Bearer ${process.env.SANITY_READ_TOKEN}`;
  try {
    const response = await fetch(url, { headers, next: { revalidate: 300 }, signal: AbortSignal.timeout(4000) });
    if (!response.ok) return fallback;
    const payload = await response.json();
    return overlayEditorial(slug, fallback, payload?.result);
  } catch {
    return fallback;
  }
}
