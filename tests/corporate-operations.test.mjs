import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateGateway, emailAcceptance, emailOperations, findEmailRoute, assessInquiry } from '../lib/corporate-operations.mjs';
import { GET, POST } from '../app/api/inquiry/route.js';

test('source maps four governed sender domains without provisioning mailboxes', () => {
  assert.equal(corporateGateway.parent,'Centauri Renewables Corporation');
  assert.equal(corporateGateway.existingCanonicalHost,'www.ctriglobal.com');
  assert.equal(corporateGateway.proposedHost,'ctricorp.com');
  assert.deepEqual(emailOperations.map(p => p.divisionId), ['corporate','energy-america','ad-astra','mutual-moon']);
  assert.deepEqual(emailOperations.map(p => p.domain), ['ctricorp.com','eavolt.com','adastra.global','mutualmoon.com']);
  for(const group of emailOperations){
    assert.equal(group.dnsAuthenticationAccepted,false);
    assert.equal(group.inboxDeliveryVerified,false);
    assert.equal(group.customerActivationApproved,false);
    assert.equal(group.suppressionServiceAccepted,false);
    for(const address of group.routes){
      assert.equal(address.active,false);
      assert.ok(address.proposedAddress.endsWith('@' + group.domain));
    }
  }
  assert.ok(emailAcceptance.some(s=>s.includes('DKIM')));
});

test('fake and sensitive routes never reach corporate CRM', () => {
  assert.equal(findEmailRoute('__proto__','sales'),null);
  assert.equal(findEmailRoute('corporate','__proto__'),null);
  assert.equal(assessInquiry({divisionId:'__proto__',intent:'general'}).state,'REJECTED');
  assert.equal(assessInquiry({divisionId:'energy-america',intent:'marketing'}).state,'REJECTED');
  assert.equal(assessInquiry({divisionId:'mutual-moon',intent:'member-support'}).reason,'ISOLATED_MEMBER_SUPPORT_REQUIRED');
  assert.equal(assessInquiry({divisionId:'mutual-moon',intent:'privacy'}).dispatch,false);
  assert.equal(assessInquiry({divisionId:'mutual-moon',intent:'safety'}).dispatch,false);
  const general=assessInquiry({divisionId:'mutual-moon',intent:'general'});
  assert.equal(general.proposedAddress,'hello@mutualmoon.com');
  assert.equal(general.dispatch,false);
  for (const [divisionId,intent] of [['corporate','partnership'],['corporate','investor'],['energy-america','rfq'],['energy-america','order-support'],['ad-astra','enterprise-demo'],['ad-astra','billing']]){
    const r=assessInquiry({divisionId,intent,hasConsent:true});
    assert.equal(r.state,'HOLD');
    assert.equal(r.dispatch,false);
    assert.equal(r.crmWrite,false);
    assert.equal(r.emailSend,false);
  }
});

test('intake API fails closed without reading, saving or returning personal details', async () => {
  for(const fn of [GET,POST]){
    const response = await fn();
    assert.equal(response.status,503);
    assert.match(response.headers.get('cache-control'),/no-store/);
    const payload=await response.json();
    assert.equal(payload.code,'CRC_INTAKE_NOT_AUTHORIZED');
    assert.equal(payload.email,undefined);
  }
  const file=readFileSync(new URL('../app/api/inquiry/route.js',import.meta.url),'utf8');
  assert.doesNotMatch(file,/await request\.(json|text|formData)\(/);
  assert.doesNotMatch(file,/fetch\(/);
});
