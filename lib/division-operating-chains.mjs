/**
 * CRC enterprise division registry and *non-executing* email/CRM routing contract.
 * No customer records are read or written by this module.
 */
export const crcLaunchBoundary = Object.freeze({
  legalDisplayName: 'Centauri Renewables Corporation',
  presentCanonicalHost: 'www.ctriglobal.com',
  proposedCorporateHost: 'ctricorp.com',
  corporateDomainOwnershipVerified: false,
  trademarkClearanceRecorded: false,
  publicIndexingApproved: false,
  crmDispatchEnabled: false,
  emailSendingEnabled: false,
  googleWorkspaceMigrationApproved: false,
  productionPromotionApproved: false,
});

const division = (input) => Object.freeze({
  ...input,
  proposedMailboxes: Object.freeze(input.proposedMailboxes),
  pipeline: Object.freeze(input.pipeline),
  mailboxesProvisioned: false,
  crmIntegrationAccepted: false,
  publicCustomerActivationApproved: false,
});

export const divisionOperatingChains = Object.freeze([
  division({
    id: 'energy-america',
    name: 'Energy America / EA-VOLT',
    website: 'eavolt.com',
    repository: 'zohebkhanfiji-ux/energy-america-site',
    proposedMailboxes: ['sales@eavolt.com', 'orders@eavolt.com', 'procurement@eavolt.com', 'projects@eavolt.com', 'support@eavolt.com'],
    crmDestination: 'Zoho CRM: approved B2B lead and account records only',
    pipeline: ['Discovery', 'RFQ', 'Buyer qualification', 'Human-approved quotation', 'Contract / PO review', 'Fulfillment', 'After-sales'],
    memberDataAllowedInCorporateCrm: false,
    publicSummary: 'Solar-module manufacturing, energy storage and approved infrastructure commercial workflows.',
    image: '/images/solar.webp',
  }),
  division({
    id: 'ad-astra',
    name: 'Ad Astra',
    website: 'adastra.global',
    repository: 'Centauri-corp/ad-astra-public-source',
    proposedMailboxes: ['hello@adastra.global', 'enterprise@adastra.global', 'support@adastra.global', 'billing@adastra.global', 'security@adastra.global'],
    crmDestination: 'Zoho CRM: consented enterprise sales metadata; no private model conversations',
    pipeline: ['Product discovery', 'Authorized account registration', 'Commercial qualification', 'Approved checkout', 'Provisioning', 'Support', 'Renewal'],
    memberDataAllowedInCorporateCrm: false,
    publicSummary: 'Advanced intelligence software, human-AI experiences and enterprise solutions subject to product acceptance.',
    image: '/images/space.webp',
  }),
  division({
    id: 'mutual-moon',
    name: 'Mutual Moon',
    website: 'mutualmoon.com',
    repository: 'zohebkhanfiji-ux/mutualmoon',
    proposedMailboxes: ['hello@mutualmoon.com', 'support@mutualmoon.com', 'safety@mutualmoon.com', 'privacy@mutualmoon.com', 'billing@mutualmoon.com'],
    crmDestination: 'No member profiles, messages, matches or safety reports in corporate CRM; aggregate reporting only',
    pipeline: ['Public discovery', 'Eligibility', 'Account verification', 'Consent preferences', 'Onboarding', 'Moderation / support', 'Membership servicing'],
    memberDataAllowedInCorporateCrm: false,
    publicSummary: 'A distinct consumer social and community business with independent privacy and safety controls.',
    image: '/images/integrated-system.webp',
  }),
]);

export function getDivisionChain(id) {
  return typeof id === 'string' ? (divisionOperatingChains.find((item) => item.id === id) || null) : null;
}

/** Preview-only. No provider calls, credentials, data persistence, or email sends. */
export function previewLeadRoute({ divisionId, intent, marketingConsent = false } = {}) {
  const target = getDivisionChain(divisionId);
  if (!target) return Object.freeze({ status: 'REJECTED', reason: 'UNKNOWN_DIVISION', dispatch: false });
  if (divisionId === 'mutual-moon' && ['member-profile', 'matching', 'personal-message', 'safety-report'].includes(intent)) {
    return Object.freeze({ status: 'REJECTED', reason: 'MEMBER_DATA_MUST_REMAIN_ISOLATED', dispatch: false });
  }
  if (intent === 'marketing' && marketingConsent !== true) {
    return Object.freeze({ status: 'HOLD', reason: 'MARKETING_CONSENT_REQUIRED', dispatch: false });
  }
  return Object.freeze({
    status: 'HOLD',
    reason: 'MAILBOX_AND_CRM_PROVIDER_ACCEPTANCE_PENDING',
    divisionId: target.id,
    proposedMailbox: target.proposedMailboxes[0],
    crmDestination: target.crmDestination,
    dispatch: false,
  });
}
