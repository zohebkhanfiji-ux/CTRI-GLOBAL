'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { groups, pages } from '../app/site-data';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); setActive(null); }, [pathname]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); setActive(null); menuButtonRef.current?.focus(); } };
    const onPointer = (e) => { if (!headerRef.current?.contains(e.target)) { setOpen(false); setActive(null); } };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onPointer); };
  }, []);
  return <header ref={headerRef} className="site-header"><div className="header-inner shell">
    <Link className="wordmark" href="/" aria-label="CTRI Global home"><span>CTRI <strong>GLOBAL</strong><small>A CENTAURI PERSPECTIVE</small></span></Link>
    <button ref={menuButtonRef} className="mobile-menu-button" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    <nav id="primary-nav" className={'primary-nav ' + (open ? 'is-open' : '')} aria-label="Primary navigation">
      {groups.map(group => <div className="nav-group" key={group.label}>
        <Link className="nav-top-link" href={'/explore/' + group.items[0]}>{group.label}</Link>
        <button type="button" className="nav-trigger" aria-label={`Show ${group.label} links`} aria-expanded={active === group.label} aria-controls={'menu-' + group.label} onClick={() => setActive(active === group.label ? null : group.label)}><span aria-hidden="true">⌄</span></button>
        <div id={'menu-' + group.label} className={'nav-panel ' + (active === group.label ? 'is-active' : '')}>
          <div className="nav-panel-copy"><p className="nav-panel-heading">CTRI / {group.label}</p><h2>{group.label === 'Connect' ? 'Start a conversation.' : `Explore ${group.label.toLowerCase()}.`}</h2><p>{pages[group.items[0]].lead}</p><Link href={'/explore/' + group.items[0]} onClick={() => { setActive(null); setOpen(false); }}>View the chapter <span aria-hidden="true">↗</span></Link></div>
          <div className="nav-panel-links">{group.items.map((slug, i) => <Link key={slug} href={'/explore/' + slug} onClick={() => { setActive(null); setOpen(false); }}><span>0{i+1}</span>{pages[slug].title}<span aria-hidden="true">↗</span></Link>)}</div>
          <div className="nav-panel-visual" style={{backgroundImage:`linear-gradient(0deg,rgba(4,20,39,.75),transparent 75%),url('${pages[group.items[0]].image}')`}}><span>CONCEPTUAL VISUAL</span></div>
        </div>
      </div>)}
    </nav>
  </div></header>;
}
