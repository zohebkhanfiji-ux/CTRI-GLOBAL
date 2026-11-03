import './globals.css';
import './corporate-brand.css';
import Link from 'next/link';
import SiteHeader from '../components/site-header';
import { corporateIdentity } from '../lib/corporate-identity.mjs';

export const metadata = {
  metadataBase: new URL(corporateIdentity.siteUrl),
  title: corporateIdentity.name,
  applicationName: corporateIdentity.name,
  description: corporateIdentity.description,
  alternates: { canonical: '/' },
  robots: { index: false, follow: false },
  openGraph: {
    title: corporateIdentity.name,
    siteName: corporateIdentity.name,
    description: corporateIdentity.description,
    url: corporateIdentity.siteUrl,
    type: 'website',
  },
  twitter: { card: 'summary', title: corporateIdentity.name, description: corporateIdentity.description },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><SiteHeader />{children}<footer className="site-footer"><div className="shell footer-top"><div><Link className="footer-brand corporate-footer-brand" href="/" aria-label={corporateIdentity.name}><strong>CENTAURI</strong><span>RENEWABLE CORPORATION</span></Link><p>The main company governing the group. Centauri Labs leads research and development across all operations.</p></div><div><strong>Explore</strong><Link href="/explore/company">Company</Link><Link href="/explore/centauri-labs">Centauri Labs R&amp;D</Link><Link href="/explore/manufacturing">Energy America manufacturing</Link><Link href="/explore/integrated-energy">Energy and infrastructure</Link></div><div><strong>Connect</strong><Link href="/explore/connect">Contact pathway</Link><a href="https://www.centauri-renewables.com/" target="_blank" rel="noopener noreferrer">Centauri energy platform ↗</a></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} {corporateIdentity.name}</span><span>Visual concepts illustrate ideas; they do not document operational sites, delivered projects or partnerships.</span></div></footer></body></html>;
}
