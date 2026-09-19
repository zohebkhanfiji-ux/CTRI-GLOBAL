import './globals.css';

export const metadata = {
  title: 'CTRI Global | A new perspective',
  description: 'The new digital home of CTRI Global. Our website is in development.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
