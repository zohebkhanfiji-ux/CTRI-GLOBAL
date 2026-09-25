'use client';
import Link from 'next/link';
import { useState } from 'react';

const layers = [
  { title: 'Generation', number: '01', href: '/explore/solar', image: '/images/solar.webp', description: 'Start with the resource, location, product pathway and the evidence needed to describe performance.' },
  { title: 'Storage', number: '02', href: '/explore/storage', image: '/images/storage.webp', description: 'Consider timing, safety, controls and the operating conditions that give storage its role.' },
  { title: 'Infrastructure', number: '03', href: '/explore/infrastructure', image: '/images/integrated-system.webp', description: 'Connect the physical system to land, networks, delivery and the people responsible for it.' },
  { title: 'Stewardship', number: '04', href: '/explore/climate', image: '/images/space.webp', description: 'Define boundaries and evidence before making claims about long-term environmental outcomes.' },
];

export default function SystemExplorer() {
  const [selected, setSelected] = useState(0);
  const item = layers[selected];
  return <section className="system-strip" aria-labelledby="system-title"><div className="shell system-layout">
    <div className="system-intro"><p className="eyebrow light">A CONNECTED FRAMEWORK</p><h2 id="system-title">See how the pieces fit.</h2><p>Four areas of inquiry. Select a layer to explore its role.</p>
      <div className="system-visual" style={{ backgroundImage: `linear-gradient(180deg, transparent 25%, rgba(3,16,32,.88)), url('${item.image}')` }} role="img" aria-label={`Conceptual illustration for ${item.title.toLowerCase()}`}><span>CONCEPT / {item.number}</span><strong>{item.title}</strong></div>
    </div>
    <div className="system-steps" aria-label="Energy system layers">{layers.map((layer, i) => <div className="system-layer" key={layer.title}>
      <button type="button" aria-expanded={selected === i} aria-controls="system-detail" className={selected === i ? 'is-selected' : ''} onClick={() => setSelected(i)}><span>{layer.number}</span><strong>{layer.title}</strong><span aria-hidden="true">{selected === i ? '−' : '+'}</span></button>
      {selected === i && <div id="system-detail" className="system-detail"><p>{layer.description}</p><Link href={layer.href}>Explore {layer.title.toLowerCase()} <span aria-hidden="true">↗</span></Link></div>}
    </div>)}</div>
  </div></section>;
}
