/**
 * CRC central corporate launch contracts. These descriptors are not operational mailboxes.
 * All operations are fail-closed until independent proof and external provider acceptance.
 */
import { getDivisionChain } from './division-operating-chains.mjs';

export const corporateGateway = Object.freeze({
  parent: 'Centauri Renewables Corporation',
  existingCanonicalHost: 'www.ctriglobal.com',
  proposedHost: 'ctricorp.com',
  corporateMailDomainVerified: false,
  publicContactIntakeEnabled: false,
  customerEmailEnabled: false,
  marketingEnabled: false,
  crmWritesEnabled: false,
  approvedProviderConfiguration: false,
});

const policy = (divisionId, domain, existingMailDomain, routes) => Object.freeze({
  divisionId, domain, existingMailDomain,
  routes: Object.freeze(routes.map(([role, kind, audience]) => Object.freeze({role, kind, audience, proposedAddress: role + '@' + domain, active: false}))),
  dnsAuthenticationAccepted: false,
  inboxDeliveryVerified: false,
  suppressionServiceAccepted: false,
  customerActivationApproved: false,
});

export const emailOperations = Object.freeze([
  policy('corporate', 'ctricorp.com', 'ctriglobal.com', [
    ['executive','operational','corporate'],['info','operational','corporate'],
    ['investors','operational','corporate'],['legal','restricted','corporate'],
    ['compliance','restricted','corporate'],['partnerships','operational','corporate'],
  ]),
  policy('energy-america', 'eavolt.com', 'ea-global.us', [
    ['sales','commercial','b2b'],['orders','transactional','b2b'],
    ['procurement','commercial','b2b'],['projects','commercial','b2b'],
    ['support','transactional','b2b'],
  ]),
  policy('ad-astra', 'adastra.global', null, [
    ['hello','commercial','enterprise'],['enterprise','commercial','enterprise'],
    ['support','transactional','customer'],['billing','transactional','customer'],
    ['security','restricted','customer'],
  ]),
  policy('mutual-moon', 'mutualmoon.com', null, [
    ['hello','operational','public'],['support','transactional','member'],
    ['safety','restricted','member'],['privacy','restricted','member'],
    ['billing','transactional','member'],
  ]),
]);

export const emailAcceptance = Object.freeze([
  'Corporate domain ownership and legal authorization',
  'Google Workspace tenant and account-role verification',
  'MX continuity and existing mailbox recovery validation',
  'SPF, DKIM and DMARC authentication with aligned FROM domains',
  'Separate operational, transactional, security and marketing streams',
  'Consent/lawful basis, unsubscribe and suppression evidence',
  'Synthetic external delivery, bounce and reply-path verification',
  'Independent CRC release case and audit receipts',
]);

export function findEmailRoute(divisionId, role) {
  if (typeof divisionId !== 'string' || typeof role !== 'string') return null;
  const owner = emailOperations.find(p => p.divisionId === divisionId);
  if (!owner) return null;
  return owner.routes.find(x => x.role === role) || null;
}

/** A pure plan result. Never sends email, persists lead data or calls CRM. */
export function assessInquiry({divisionId, intent, hasConsent = false} = {}) {
  const validIntents = Object.freeze({
    'corporate': ['partnership','investor','general'],
    'energy-america': ['rfq','order-support','project'],
    'ad-astra': ['enterprise-demo','product-support','billing'],
    'mutual-moon': ['general','member-support','privacy','safety'],
  });
  if (!Object.hasOwn(validIntents, divisionId) || !validIntents[divisionId].includes(intent)) {
    return Object.freeze({state:'REJECTED',reason:'INVALID_DIVISION_OR_INTENT',dispatch:false});
  }
  if (divisionId === 'mutual-moon' && ['member-support','privacy','safety'].includes(intent)) {
    return Object.freeze({state:'HOLD',reason:'ISOLATED_MEMBER_SUPPORT_REQUIRED',dispatch:false,divisionId,intent});
  }
  const roleByIntent = {
    partnership:'partnerships',investor:'investors',general:'info',
    rfq:'sales','order-support':'support',project:'projects',
    'enterprise-demo':'enterprise','product-support':'support',billing:'billing',
  };
  const role = roleByIntent[intent];
  const route = findEmailRoute(divisionId,role);
  if (!route || (divisionId !== 'corporate' && !getDivisionChain(divisionId))) {
    return Object.freeze({state:'HOLD',reason:'NO_VERIFIED_ROUTING',dispatch:false,divisionId,intent});
  }
  return Object.freeze({
    state:'HOLD',
    reason: hasConsent ? 'PROVIDER_AND_RELEASE_GATES_PENDING' : 'INQUIRY_CONSENT_AND_PROVIDER_ACCEPTANCE_PENDING',
    divisionId,intent,proposedRole:role, proposedAddress:route.proposedAddress,
    dispatch:false, crmWrite:false, emailSend:false,
  });
}
