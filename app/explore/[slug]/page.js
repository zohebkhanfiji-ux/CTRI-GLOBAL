import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { groups, pages } from '../../site-data';

export function generateStaticParams() { return Object.keys(pages).map(slug => ({ slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params; const item = pages[slug];
  return item ? { title: item.title + ' | CTRI Global', description: item.lead } : {};
}
export default async function ExplorePage({ params }) {
  const { slug } = await params;
  const item = pages[slug];
  if (!item) notFound();
  const group = groups.find(g => g.items.includes(slug));
  const siblings = group.items.filter(s => s !== slug);
  return <main id="main" className="interior">
    <section className="interior-hero" aria-labelledby="page-title"><Image src={item.image} alt="" fill priority sizes="100vw" className="cover-image" /><div className="interior-hero-content shell"><p className="eyebrow light">{item.kicker}</p><h1 id="page-title">{item.title}</h1><p>{item.lead}</p></div><span className="image-credit shell">Conceptual imagery</span></section>
    <div className="breadcrumb shell"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>{group.label}</span><span aria-hidden="true">/</span><strong>{item.title}</strong></div>
    <section className="interior-body section-pad shell"><div><p className="eyebrow">THE PERSPECTIVE</p><h2>{item.lead}</h2></div><div><p className="large-copy">{item.body}</p><p className="muted-copy">Explore the connections that sit behind this topic, then continue into the related chapters below.</p></div></section>
    <section className="principles shell" aria-labelledby="principles-title"><p className="eyebrow">THREE LENSES</p><h2 id="principles-title">Look a little closer.</h2><div className="principle-grid">{item.points.map((point, i) => <div key={point}><span>0{i+1}</span><h3>{point}</h3><p>{['Start with the context and define the real question.','Understand the relationships and tradeoffs across the whole system.','Use evidence and experience to inform the next decision.'][i]}</p></div>)}</div></section>
    <section className="related section-pad shell" aria-labelledby="related-title"><div className="section-heading"><div><p className="eyebrow">CONTINUE EXPLORING</p><h2 id="related-title">Follow the connections.</h2></div></div><div className="related-grid">{(siblings.length ? siblings : ['company','integrated-energy','engineering']).slice(0,3).map(s => <Link key={s} href={'/explore/'+s}>{pages[s].title}<span aria-hidden="true">↗</span></Link>)}</div>{slug === 'connect' && <a className="button button-primary outbound" href="https://www.centauri-renewables.com/" target="_blank" rel="noopener noreferrer">Centauri Renewables public site ↗</a>}</section>
  </main>;
}
