import Link from 'next/link';
import { corporateIdentity } from '../../lib/corporate-identity.mjs';
import { crcLaunchBoundary, divisionOperatingChains } from '../../lib/division-operating-chains.mjs';

export const metadata = {
  title: 'Our divisions | ' + corporateIdentity.name,
  description: 'Explore the independently governed business divisions and planned customer journeys of Centauri Renewables Corporation.',
  robots: { index: false, follow: false },
};

export default function DivisionsPage() {
  return <main id="main" className="interior">
    <section className="interior-hero division-hero" aria-labelledby="divisions-page-title">
      <div className="interior-hero-content shell">
        <p className="eyebrow light">CENTAURI RENEWABLES CORPORATION</p>
        <h1 id="divisions-page-title">One enterprise.<br />Distinct frontiers.</h1>
        <p>Explore CRC's operating divisions through one accountable corporate framework. Customer communications and transaction services remain independently controlled.</p>
      </div>
    </section>
    <div className="breadcrumb shell"><Link href="/">Home</Link><span aria-hidden="true">/</span><strong>Divisions</strong></div>
    <section className="section-pad shell">
      <div className="section-heading">
        <div><p className="eyebrow">CRC CORPORATE OPERATING SYSTEM</p><h2>Our operating platforms.</h2></div>
        <p>Each business maintains its own customer workflows, privacy responsibilities and launch acceptance.</p>
      </div>
      <div className="division-directory">
        {divisionOperatingChains.map((unit, index) => <article className="division-directory-card" key={unit.id}>
          <div>
            <p className="eyebrow">DIVISION {String(index + 1).padStart(2, '0')} / {unit.website}</p>
            <h3>{unit.name}</h3>
            <p>{unit.publicSummary}</p>
            <Link className="text-link" href={'/explore/' + unit.id}>Explore division <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="division-directory-flow">
            <strong>Proposed service journey</strong>
            <ol>{unit.pipeline.map((step) => <li key={step}>{step}</li>)}</ol>
            <p className="muted-copy">Mailbox provisioning and CRM dispatch are not yet active.</p>
          </div>
        </article>)}
      </div>
    </section>
    <section className="division-boundary">
      <div className="shell">
        <p className="eyebrow light">CONTROLLED RELEASE</p>
        <h2>Trust is built into each boundary.</h2>
        <p>Corporate oversight does not authorize unrestricted access to customers' data. Mutual Moon member data stays separate from corporate business-development records. Marketing, billing, email and customer activation remain gated.</p>
        <p className="division-boundary-note">CTRICorp.com is a proposed future corporate domain; current canonical website: {crcLaunchBoundary.presentCanonicalHost}. Domain migration and public indexing are not yet active.</p>
        <Link className="text-link light-link" href="/explore/company">Review corporate structure <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  </main>;
}
