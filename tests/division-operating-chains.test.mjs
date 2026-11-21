import test from 'node:test';
import assert from 'node:assert/strict';
import { crcLaunchBoundary, divisionOperatingChains, getDivisionChain, previewLeadRoute } from '../lib/division-operating-chains.mjs';
import { pages, groups } from '../app/site-data.js';

test('CTRICorp is a proposed domain, not the active canonical host', () => {
  assert.equal(crcLaunchBoundary.proposedCorporateHost, 'ctricorp.com');
  assert.equal(crcLaunchBoundary.presentCanonicalHost, 'www.ctriglobal.com');
  for (const gate of ['corporateDomainOwnershipVerified','trademarkClearanceRecorded','publicIndexingApproved','crmDispatchEnabled','emailSendingEnabled','googleWorkspaceMigrationApproved','productionPromotionApproved']) {
    assert.equal(crcLaunchBoundary[gate], false, gate);
  }
});
test('division registry covers three independently controlled chains', () => {
  assert.deepEqual(divisionOperatingChains.map(d => d.id), ['energy-america','ad-astra','mutual-moon']);
  for (const d of divisionOperatingChains) {
    assert.equal(d.mailboxesProvisioned, false);
    assert.equal(d.crmIntegrationAccepted, false);
    assert.equal(d.publicCustomerActivationApproved, false);
    assert.equal(d.memberDataAllowedInCorporateCrm, false);
    assert.equal(new URL('https://' + d.website).hostname, d.website);
    assert.ok(d.pipeline.length >= 6);
    assert.ok(d.proposedMailboxes.every(address => address.endsWith('@' + d.website)));
    assert.ok(Object.hasOwn(pages, d.id));
  }
  assert.ok(groups.some(g => g.label === 'Divisions' && g.items.length === 3));
  assert.equal(getDivisionChain('__proto__'), null);
});
test('routing is fail-closed and cannot send customer or marketing data', () => {
  assert.deepEqual(previewLeadRoute({divisionId:'unknown',intent:'rfq'}), {status:'REJECTED',reason:'UNKNOWN_DIVISION',dispatch:false});
  assert.equal(previewLeadRoute({divisionId:'energy-america',intent:'marketing'}).reason, 'MARKETING_CONSENT_REQUIRED');
  assert.equal(previewLeadRoute({divisionId:'ad-astra',intent:'marketing',marketingConsent:true}).dispatch, false);
  assert.equal(previewLeadRoute({divisionId:'mutual-moon',intent:'member-profile'}).reason,'MEMBER_DATA_MUST_REMAIN_ISOLATED');
  assert.equal(previewLeadRoute({divisionId:'mutual-moon',intent:'safety-report'}).dispatch, false);
  assert.equal(previewLeadRoute({divisionId:'energy-america',intent:'rfq'}).status, 'HOLD');
});
