import Link from 'next/link';
import { corporateIdentity, productReleaseNotice } from '../../lib/corporate-identity.mjs';

export const metadata = {
  title: 'Solutions | ' + corporateIdentity.name,
  description: 'Corporate overview of advanced energy systems, enterprise intelligence and research-led engineering across the Centauri Renewables portfolio.',
  robots: { index: false, follow: false },
};

const solutionAreas = [
  {name:'Solar manufacturing and energy storage',segment:'ENERGY & INFRASTRUCTURE',href:'/explore/energy-america',
   description:'Explore Energy America and EA-VOLT responsibilities for solar products, storage and qualified industrial project inquiries.',items:['Commercial buyer qualification','Controlled request-for-quotation flow','Technical and product evidence review']},
  {name:'Enterprise intelligence and automation',segment:'DIGITAL INTELLIGENCE',href:'/explore/ad-astra',
   description:'Explore Ad Astra software and enterprise solution concepts with separate product safety, privacy and commercialization reviews.',items:['Enterprise discovery','Product evaluation','Protected customer onboarding']},
  {name:'Applied research and development',segment:'SCIENCE & ENGINEERING',href:'/explore/centauri-labs',
   description:'Explore cross-divisional research, engineering and technical-validation topics under Centauri Labs.',items:['Technical validation','Research collaboration','Responsible technology transfer']},
  {name:'Community and social technology',segment:'CONSUMER EXPERIENCES',href:'/explore/mutual-moon',
   description:'Explore Mutual Moon as an independent consumer service subject to member safety, privacy and eligibility controls.',items:['Privacy by design','Member protection','Account support']},
];

export default function SolutionsPage() {
  return <main id="main" className="interior">
    <section className="interior-hero division-hero" aria-labelledby="solutions-title">
      <div className="interior-hero-content shell">
        <p className="eyebrow light">CRC / INDUSTRIES AND SOLUTIONS</p>
        <h1 id="solutions-title">Intelligence, energy<br />and the next frontier.</h1>
        <p>Explore the disciplines and business pathways that connect a diverse enterprise. Division capabilities and claims remain subject to independent acceptance.</p>
      </div>
    </section>
    <div className="breadcrumb shell"><Link href="/">Home</Link><span aria-hidden="true">/</span><strong>Solutions</strong></div>
    <section className="section-pad shell">
      <div className="section-heading"><div><p className="eyebrow">BUSINESS PORTFOLIO</p><h2>One integrated perspective.</h2></div><p>Individual products, availability, pricing and operating status are validated by the accountable division.</p></div>
      <div className="division-directory">{solutionAreas.map((area,i)=><article className="division-directory-card" key={area.href}>
        <div>
          <p className="eyebrow">{String(i+1).padStart(2,'0')} / {area.segment}</p>
          <h3>{area.name}</h3><p>{area.description}</p>
          <Link className="text-link" href={area.href}>Explore solution area <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="division-directory-flow"><strong>Controlled customer pathway</strong><ol>{area.items.map(x=><li key={x}>{x}</li>)}</ol></div>
      </article>)}</div>
      <p className="muted-copy" style={{marginTop:36}}>{productReleaseNotice}</p>
      <Link className="button button-primary" href="/contact">Review inquiry pathways <span aria-hidden="true">↗</span></Link>
    </section>
  </main>;
}
