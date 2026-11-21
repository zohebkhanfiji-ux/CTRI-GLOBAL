'use client';
import { useMemo, useState } from 'react';
import { assessInquiry, corporateGateway } from '../lib/corporate-operations.mjs';

const choices = Object.freeze({
  'corporate': {label:'CRC Corporate',intents:[['general','Corporate inquiry'],['partnership','Partnership'],['investor','Investor relations']]},
  'energy-america': {label:'Energy America / EA-VOLT',intents:[['rfq','Request for quotation'],['project','EPC / Infrastructure'],['order-support','Order support']]},
  'ad-astra': {label:'Ad Astra',intents:[['enterprise-demo','Enterprise inquiry'],['product-support','Product support'],['billing','Billing inquiry']]},
  'mutual-moon': {label:'Mutual Moon',intents:[['general','General information'],['member-support','Member support'],['privacy','Privacy'],['safety','Safety']]},
});

export default function ContactJourneyExplorer() {
  const [divisionId,setDivisionId] = useState('corporate');
  const [intent,setIntent] = useState('general');
  const choice = choices[divisionId];
  const result = useMemo(()=>assessInquiry({divisionId,intent}),[divisionId,intent]);
  return <div className="contact-flow">
    <p className="eyebrow">INQUIRY ROUTING / REVIEW MODE</p>
    <h2>Find the right business pathway.</h2>
    <p className="muted-copy">Explore how your inquiry would reach the appropriate CRC business. This preview does not collect personal details, open an email application, or submit a CRM record.</p>
    <div className="contact-flow-controls">
      <div><label htmlFor="division-choice">Business division</label>
        <select id="division-choice" value={divisionId} onChange={e=>{const next=e.target.value;setDivisionId(next);setIntent(choices[next].intents[0][0]);}}>
          {Object.entries(choices).map(([id,c])=><option key={id} value={id}>{c.label}</option>)}
        </select>
      </div>
      <div><label htmlFor="inquiry-choice">Inquiry category</label>
        <select id="inquiry-choice" value={intent} onChange={e=>setIntent(e.target.value)}>
          {choice.intents.map(([id,label])=><option key={id} value={id}>{label}</option>)}
        </select>
      </div>
    </div>
    <div className="contact-flow-result" role="status" aria-live="polite">
      <p className="eyebrow">PROPOSED ROUTING — NOT ACTIVE</p>
      <h3>{choice.label}</h3>
      <p>{result.reason === 'ISOLATED_MEMBER_SUPPORT_REQUIRED' ? 'Sensitive member support belongs in the dedicated Mutual Moon member-protection system, not the corporate sales CRM.' : 'A governed division-specific customer-service and CRM handoff is planned, subject to mailbox and provider acceptance.'}</p>
      <p className="contact-flow-caution">No message will be sent. No customer record will be created.</p>
    </div>
    <p className="muted-copy">The proposed new corporate domain <strong>{corporateGateway.proposedHost}</strong> is not yet active. Existing contact channels remain unchanged until corporate ownership, security and delivery tests are verified.</p>
  </div>;
}
