import { getPreviewSitemap } from '../lib/seo-contracts.mjs';

// Route discovery manifest is staged for QA only. robots.txt and X-Robots-Tag
// still prohibit indexing until all CRC public release gates have passed.
export default function sitemap() {
  return getPreviewSitemap();
}
