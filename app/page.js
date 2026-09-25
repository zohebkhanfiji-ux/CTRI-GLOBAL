import Link from 'next/link';
import Image from 'next/image';
import MotionToggle from '../components/motion-toggle';
import { groups, pages } from './site-data';

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
      <div className="hero-content shell">
        <p className="eyebrow light">CTRI GLOBAL <span className="eyebrow-line" /> A CENTAURI PERSPECTIVE</p>
        <h1 id="hero-title">A new perspective<br /><em>on what comes next.</em></h1>
        <p className="hero-lead">Energy, engineering and exploration belong in the same conversation. Discover a connected view of the systems shaping tomorrow.</p>
        <div className="hero-actions"><Link className="button button-primary" href="/explore/integrated-energy">Explore the system <span aria-hidden="true">↗</span></Link><Link className="text-link light-link" href="/explore/company">Our perspective <span aria-hidden="true">↗</span></Link></div>
      </div>
      <div className="hero-bottom shell"><span>01 / 04 — THE CONNECTED VIEW</span><span>SCROLL TO EXPLORE ↓</span><MotionToggle /></div>
    </section>

    <section className="statement section-pad shell" aria-labelledby="statement-title">
      <p className="eyebrow">THE BIGGER PICTURE</p>
      <div className="statement-grid"><h2 id="statement-title">Progress is a <em>system.</em></h2><div><p className="large-copy">The future is built through connections: between technology and place, ideas and delivery, ambition and responsibility.</p><p className="muted-copy">CTRI Global brings these perspectives together in one place. Explore the framework, the questions and the areas of focus that guide the conversation.</p><Link className="text-link" href="/explore/company">Discover CTRI Global <span aria-hidden="true">↗</span></Link></div></div>
    </section>

    <section className="image-break" aria-labelledby="image-title"><Image src="/images/integrated-system.webp" alt="Conceptual composite illustrating research, manufacturing, energy infrastructure and a control room" fill sizes="100vw" className="cover-image" /><div className="image-break-content shell"><p className="eyebrow light">ONE CONNECTED FRAMEWORK</p><h2 id="image-title">From first idea<br />to the wider world.</h2><p>Explore the disciplines that meet at the intersection of energy and engineering.</p></div><span className="image-credit shell">Conceptual visualization</span></section>

    <section className="chapters section-pad shell" aria-labelledby="chapters-title"><div className="section-heading"><div><p className="eyebrow">EXPLORE OUR WORLD</p><h2 id="chapters-title">The chapters.</h2></div><p>Move from the full system to the details that make it work.</p></div><div className="chapter-grid">{chapters.map((item) => <Link key={item.label} href={item.href} className="chapter-card"><div className="chapter-image"><Image src={item.image} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" className="cover-image" /></div><div className="chapter-meta"><span>{item.label}</span><span aria-hidden="true">↗</span></div><h3>{item.title}</h3><p>{item.copy}</p></Link>)}</div></section>

    <section className="system-strip" aria-labelledby="system-title"><div className="shell system-layout"><div className="system-intro"><p className="eyebrow light">A CONNECTED FRAMEWORK</p><h2 id="system-title">See how the pieces fit.</h2><p>Four areas of inquiry. One wider view.</p></div><div className="system-steps">{['Generation', 'Storage', 'Infrastructure', 'Stewardship'].map((title, i) => <Link key={title} href={['/explore/solar', '/explore/storage', '/explore/infrastructure', '/explore/climate'][i]}><span>0{i+1}</span><strong>{title}</strong><span aria-hidden="true">↗</span></Link>)}</div></div></section>

    <section className="index-section section-pad shell" aria-labelledby="index-title"><div className="section-heading"><div><p className="eyebrow">THE FULL PICTURE</p><h2 id="index-title">Explore every dimension.</h2></div><p>A clear route through the themes behind the CTRI Global story.</p></div><div className="index-grid">{groups.map(group => <div className="index-group" key={group.label}><h3>{group.label}</h3>{group.items.map(slug => <Link key={slug} href={'/explore/'+slug}>{pages[slug].title}<span aria-hidden="true">↗</span></Link>)}</div>)}</div></section>

    <section className="closing" aria-labelledby="closing-title"><div className="shell closing-inner"><p className="eyebrow light">THE NEXT CONVERSATION</p><h2 id="closing-title">Let’s look further.</h2><p>Learn about Centauri Renewables or explore ways to connect.</p><div className="closing-actions"><Link className="button button-primary" href="/explore/connect">Get in touch <span aria-hidden="true">↗</span></Link><a className="text-link light-link" href="https://www.centauri-renewables.com/" target="_blank" rel="noopener noreferrer">Visit Centauri Renewables <span aria-hidden="true">↗</span></a></div></div></section>
  </main>;
}
