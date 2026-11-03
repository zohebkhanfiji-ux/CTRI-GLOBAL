import Link from 'next/link';
import Image from 'next/image';
import MotionToggle from '../components/motion-toggle';
import SystemExplorer from '../components/system-explorer';
import { groups, pages } from './site-data';
import { corporateIdentity, manufacturingLines, productReleaseNotice } from '../lib/corporate-identity.mjs';

const chapters = [
  { title: 'A connected energy system.', label: '01 / INTEGRATED ENERGY', image: '/images/integrated-system.webp', href: '/explore/integrated-energy', copy: 'See generation, storage and infrastructure as parts of one system.' },
  { title: 'Designed across the lifecycle.', label: '02 / ENGINEERING', image: '/images/storage.webp', href: '/explore/engineering', copy: 'Understand the questions that carry an idea from design into operation.' },
  { title: 'A wider field of view.', label: '03 / FRONTIERS', image: '/images/space.webp', href: '/explore/frontiers', copy: 'Explore ideas at the edge of energy, institutions and space.' },
];

export default function Home() {
  return <main id="main">
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="hero-coordinate" aria-hidden="true"><span>EARTH / ENERGY</span><span>CONNECTED SYSTEMS</span></div>
      <div className="hero-content shell">
        <p className="eyebrow light">{corporateIdentity.name.toUpperCase()}</p>
        <h1 id="hero-title">A new perspective<br /><em>on what comes next.</em></h1>
        <p className="hero-lead">Group governance, research, manufacturing and intelligent customer experiences. One connected vision under Centauri Renewable Corporation.</p>
        <div className="hero-actions"><Link className="button button-primary" href="/explore/manufacturing">Explore manufacturing <span aria-hidden="true">↗</span></Link><Link className="text-link light-link" href="/explore/company">Our company <span aria-hidden="true">↗</span></Link></div>
      </div>
      <div className="hero-bottom shell"><span>01 / 04 — THE CONNECTED VIEW</span><span>SCROLL TO EXPLORE ↓</span><MotionToggle /></div>
      <p className="hero-visual-note">Conceptual visualization · not a project photograph</p>
    </section>

    <section className="statement section-pad shell" aria-labelledby="statement-title">
      <p className="eyebrow">THE MAIN COMPANY</p>
      <div className="statement-grid"><h2 id="statement-title">Progress is a <em>system.</em></h2><div><p className="large-copy">Centauri Renewable Corporation governs the group. Centauri Labs leads research and development across all operations.</p><p className="muted-copy">Energy America is the manufacturing business. EA-VOLT manages energy and infrastructure operations, while AD ASTRA provides the advanced-intelligence customer-experience platform. Mutual Moon operates the separate social and dating business, and Centauri Bio focuses on bioscience.</p><Link className="text-link" href="/explore/company">Discover our company <span aria-hidden="true">↗</span></Link></div></div>
    </section>

    <section className="manufacturing-scope section-pad shell" aria-labelledby="manufacturing-title">
      <p className="eyebrow">ENERGY AMERICA / MANUFACTURING</p>
      <h2 id="manufacturing-title">From cells to modules.<br /><em>From energy to storage.</em></h2>
      <p className="scope-intro">Energy America's manufacturing scope connects solar products, nickel-hydrogen storage and the group's NASA-origin selenium technology program, with research and technical validation led by Centauri Labs.</p>
      <div className="principle-grid">{manufacturingLines.map((line, i) => <article key={line.title}><span>{String(i+1).padStart(2,'0')}</span><h3>{line.title}</h3><p>{line.description}</p></article>)}</div>
      <p className="release-note">{productReleaseNotice}</p>
      <Link className="text-link" href="/explore/manufacturing">Explore Energy America manufacturing <span aria-hidden="true">↗</span></Link>
    </section>

    <section className="image-break" aria-labelledby="image-title"><Image src="/images/integrated-system.webp" alt="Conceptual composite illustrating research, manufacturing, energy infrastructure and a control room" fill sizes="100vw" className="cover-image" /><div className="image-break-content shell"><p className="eyebrow light">ONE CONNECTED FRAMEWORK</p><h2 id="image-title">From first idea<br />to the wider world.</h2><p>Explore the disciplines that meet at the intersection of energy and engineering.</p></div><span className="image-credit shell">Conceptual visualization</span></section>

    <section className="chapters section-pad shell" aria-labelledby="chapters-title"><div className="section-heading"><div><p className="eyebrow">EXPLORE OUR WORLD</p><h2 id="chapters-title">The chapters.</h2></div><p>Move from the full system to the details that make it work.</p></div><div className="chapter-grid">{chapters.map((item) => <Link key={item.label} href={item.href} className="chapter-card"><div className="chapter-image"><Image src={item.image} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" className="cover-image" /></div><div className="chapter-meta"><span>{item.label}</span><span aria-hidden="true">↗</span></div><h3>{item.title}</h3><p>{item.copy}</p></Link>)}</div></section>

    <SystemExplorer />

    <section className="index-section section-pad shell" aria-labelledby="index-title"><div className="section-heading"><div><p className="eyebrow">THE FULL PICTURE</p><h2 id="index-title">Explore every dimension.</h2></div><p>A clear route through the company, its capabilities and its research perspective.</p></div><div className="index-grid">{groups.map(group => <div className="index-group" key={group.label}><h3>{group.label}</h3>{group.items.map(slug => <Link key={slug} href={'/explore/'+slug}>{pages[slug].title}<span aria-hidden="true">↗</span></Link>)}</div>)}</div></section>

    <section className="closing" aria-labelledby="closing-title"><div className="shell closing-inner"><p className="eyebrow light">THE NEXT CONVERSATION</p><h2 id="closing-title">Let’s look further.</h2><p>Explore Centauri Renewable Corporation and the capabilities across the group.</p><div className="closing-actions"><Link className="button button-primary" href="/explore/connect">Get in touch <span aria-hidden="true">↗</span></Link><Link className="text-link light-link" href="/explore/centauri-labs">Explore Centauri Labs <span aria-hidden="true">↗</span></Link></div></div></section>
  </main>;
}
