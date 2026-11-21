# CTRI Global — production-readiness audit

Audit date: 2026-11-02. Domain: ctriglobal.com. Repository: zohebkhanfiji-ux/CTRI-GLOBAL.

## Observed state
- Vercel project: ctri-global, ID prj_PowddF2Lst9EL4CvRkygezr3G1er. Latest inspected deployment was READY but had target=null and no production aliases. Project reports live=false. Do not confuse build readiness with domain release.
- Registrar DNS for ctriglobal.com is accepted by Vercel. The apex domain redirects 308 to www.ctriglobal.com. Both names are attached and ownership-verified; inspect end-to-end HTTPS after release.
- GitHub main (3902cebed5847694d1465e315e117d2486bca951) was public and unprotected. No Actions workflow runs were found at audit time.
- Next.js was 16.3.6, affected by October 2026 security advisories (fixed in 16.4.1+). This branch targets 16.4.4; verify lockfile, CI audit, and build before merge.
- Sanity project fqapypm0 / production has 15 published corporate documents. GitHub contains 22 hard-coded editorial route pages, with different route names and claim scopes. Bulk replacement is not approved.
- REVIEW.md identifies outstanding logo/font, image licensing, corporate voice, factual-claim, legal/privacy, contact and responsive-accessibility approvals.
- Current layout applies noindex/nofollow. This branch adds robots.txt and an X-Robots-Tag release barrier.

## Controlled Sanity integration
- Server-only published-content reader reads known page slugs only: company=>about, infrastructure=>infrastructure, space=>space.
- Default CTRI_SANITY_EDITORIAL_ENABLED=false and CTRI_SANITY_APPROVED_ROUTES is empty. Both gates must be set by an editor; absence, invalid CMS data, or network errors falls back to reviewed local content.
- No Sanity data is used by the client-side navigation; no external links, images, or arbitrary slugs are accepted from the CMS.
- Keep the public indexing gate closed even if a specific editorial route is approved.

## Exit criteria — required before declaring external production green
1. Reproducible npm ci, npm audit (high+), unit tests and Next.js build PASS on exact reviewed commit.
2. Protected Vercel preview READY and smoke-tested (/, /explore/company, /explore/infrastructure, unknown slug=404, /robots.txt).
3. Site owner signs off original image rights, font/logo, legal/privacy, correct corporate entity and contact, and factual NASA/manufacturing/project claims.
4. Mobile, keyboard, WCAG, links and outbound destinations verified; Security headers and noindex checked on final domain.
5. Vercel project/Git linkage, production deployment ID, both custom-domain HTTPS responses and runtime logs verified.
6. Release approval separately authorizes removal of robots/noindex and any site launch. Do not silently switch this gate.

## Non-goals
- No changes to Mutual Moon, Namecheap, Sanity published documents, contacts, subscriptions, marketing spend, or public visibility.
