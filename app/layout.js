import './globals.css';
import Link from 'next/link';
import SiteHeader from '../components/site-header';

export const metadata = {
  title: 'CTRI Global | A new perspective',
  description: 'An exploration of connected energy, engineering and the systems shaping tomorrow.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><SiteHeader />{children}<footer className="site-footer"><div className="shell footer-top"><div><Link className="footer-brand" href="/">CTRI GLOBAL<span>A Centauri perspective</span></Link><p>Looking further at the connections between energy, engineering and the future.</p></div><div><strong>Explore</strong><Link href="/explore/company">Company</Link><Link href="/explore/integrated-energy">Energy</Link><Link href="/explore/engineering">Engineering</Link><Link href="/explore/frontiers">Frontiers</Link></div><div><strong>Connect</strong><Link href="/explore/connect">Contact pathway</Link><a href="https://www.centauri-renewables.com/" target="_blank" rel="noopener noreferrer">Centauri Renewables ↗</a></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} CTRI Global</span><span>Visual concepts illustrate ideas; they do not document operational sites, delivered projects or partnerships.</span></div></footer></body></html>;
}
