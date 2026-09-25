# CTRI Global visual preview

This branch replaces the holding page with a responsive visual site. It contains a cinematic, CSS-animated homepage, seven navigation groups, and 22 editorial topic routes. Motion can be paused, and reduced-motion preferences are honored.

The visuals are conceptual assets from the Centauri site workspace. They do not document operational CTRI Global sites, delivery records, missions or partnerships. The site deliberately has `noindex, nofollow` metadata while release evidence and brand approvals remain open.

## Release gates

- Confirm the official logo/vector master, font licensing and final corporate voice.
- Replace or approve all conceptual imagery and verify rights, attribution and mobile crops.
- Produce and review the actual motion film if a film is required; this build uses CSS motion rather than a video master.
- Verify factual company and service claims, final contact endpoint, privacy/legal content and any project claims before indexing.
- Review desktop/mobile navigation, keyboard access, contrast and the full route inventory against the broader architecture pack.
- Identify the canonical Vercel project and production domain before promoting this preview; avoid syncing duplicate projects by inference.

## Validation

`npm ci && npm run build` statically generates all 22 topic routes. Local HTTP smoke checks returned 200 for the homepage and /explore/storage, and 404 for an unknown route.
