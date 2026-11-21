import Link from 'next/link';
import { corporateIdentity } from '../../lib/corporate-identity.mjs';
import ContactJourneyExplorer from '../../components/contact-journey-explorer';

export const metadata = {
  title: 'Corporate inquiries | ' + corporateIdentity.name,
  description: 'Explore the intended contact routing for CRC corporate, energy, enterprise intelligence and community divisions.',
  robots: { index: false, follow: false },
};

export default function ContactPage() {
  return <main id="main" className="interior">
    <section className="interior-hero division-hero" aria-labelledby="contact-title">
      <div className="interior-hero-content shell">
        <p className="eyebrow light">CENTAURI RENEWABLES CORPORATION / CONTACT</p>
        <h1 id="contact-title">The right conversation<br />starts here.</h1>
        <p>One corporate operating framework with separate business and member-service communications.</p>
      </div>
    </section>
    <div className="breadcrumb shell"><Link href="/">Home</Link><span aria-hidden="true">/</span><strong>Contact routing</strong></div>
    <section className="section-pad shell"><ContactJourneyExplorer /></section>
    <section className="division-boundary"><div className="shell">
      <p className="eyebrow light">CUSTOMER PROTECTION</p>
      <h2>Review without exposing customer information.</h2>
      <p>This interactive demonstration does not submit email, customer data or marketing requests. Private support and safety requests must use each business's verified operational channel once active.</p>
      <Link className="text-link light-link" href="/divisions">Explore the divisions <span aria-hidden="true">↗</span></Link>
    </div></section>
  </main>;
}
