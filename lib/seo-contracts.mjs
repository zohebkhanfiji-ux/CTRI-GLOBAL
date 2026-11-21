import { corporateIdentity } from './corporate-identity.mjs';
import { crcLaunchBoundary } from './division-operating-chains.mjs';
import { pages } from '../app/site-data.js';

const canonical = corporateIdentity.siteUrl.replace(/\/+$/, '');

export function getPreviewSitemap() {
  const paths = ['/', '/divisions', '/solutions', '/contact', ...Object.keys(pages).sort().map(slug => '/explore/' + slug)];
  return Object.freeze(paths.map(path => Object.freeze({
    url: canonical + (path === '/' ? '' : path),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1.0 : path.startsWith('/explore') ? 0.55 : 0.8,
  })));
}

/** Verified name and existing canonical domain only. No inferred certifications or affiliates. */
export function getCorporateSchema() {
  return Object.freeze({
    '@context':'https://schema.org',
    '@graph':[
      {'@type':'Organization','@id':canonical+'/#organization',name:corporateIdentity.name,url:canonical+'/'},
      {'@type':'WebSite','@id':canonical+'/#website',name:corporateIdentity.name,url:canonical+'/',publisher:{'@id':canonical+'/#organization'}},
    ]
  });
}

export function getIndexingReadiness() {
  return Object.freeze({
    existingCanonicalUrl: canonical,
    proposedDomain: crcLaunchBoundary.proposedCorporateHost,
    publicIndexingEnabled: crcLaunchBoundary.publicIndexingApproved,
    migrationReady: crcLaunchBoundary.corporateDomainOwnershipVerified && crcLaunchBoundary.trademarkClearanceRecorded && crcLaunchBoundary.publicIndexingApproved,
    googleSearchConsoleVerified: false,
    bingWebmasterVerified: false,
    hreflangAccepted: false,
    analyticsAttributionAccepted: false,
  });
}
