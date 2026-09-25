'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { groups, pages } from '../app/site-data';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); setActive(null); }, [pathname]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); setActive(null); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return <header className="site-header"><div className="header-inner shell">
    <Link className="wordmark" href="/" aria-label="CTRI Global home"><span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span><span>CTRI <strong>GLOBAL</strong><small>CENTAURI</small></span></Link>
    <button className="mobile-menu-button" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    <nav id="primary-nav" className={'primary-nav ' + (open ? 'is-open' : '')} aria-label="Primary navigation">
      {groups.map(group => <div className="nav-group" key={group.label}>
        <button type="button" className="nav-trigger" aria-expanded={active === group.label} aria-controls={'menu-' + group.label} onClick={() => setActive(active === group.label ? null : group.label)}>{group.label}<span aria-hidden="true">⌄</span></button>
        <div id={'menu-' + group.label} className={'nav-panel ' + (active === group.label ? 'is-active' : '')}>
          <p className="nav-panel-heading">{group.label}</p>
          {group.items.map(slug => <Link key={slug} href={'/explore/' + slug} onClick={() => { setActive(null); setOpen(false); }}>{pages[slug].title}<span aria-hidden="true">↗</span></Link>)}
        </div>
      </div>)}
    </nav>
  </div></header>;
}
