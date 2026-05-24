import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

const PORTFOLIO_URL = 'https://avinashk123-a-portfolio.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(PORTFOLIO_URL),
  title: {
    default: 'Avinash Reddy | Senior Software Engineer',
    template: '%s | Avinash Reddy',
  },
  description: 'Senior Flutter Engineer with 7+ years of experience. Expert in Clean Architecture, real-time mobile systems, payment integrations, and enterprise-grade applications.',
  keywords: ['Avinash Reddy', 'Flutter Developer', 'Senior Software Engineer', 'Mobile Engineer', 'Flutter', 'Dart', 'Clean Architecture', 'India', 'AvinashK123-A'],
  authors: [{ name: 'Avinash Reddy', url: PORTFOLIO_URL }],
  creator: 'Avinash Reddy',
  publisher: 'Avinash Reddy',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: PORTFOLIO_URL,
    siteName: 'Avinash Reddy Portfolio',
    title: 'Avinash Reddy | Senior Software Engineer',
    description: 'Senior Flutter Engineer with 7+ years of experience. Expert in Clean Architecture, real-time mobile systems, payment integrations, and enterprise-grade applications.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Avinash Reddy - Senior Software Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avinash Reddy | Senior Software Engineer',
    description: 'Senior Flutter Engineer with 7+ years of experience architecting enterprise-grade mobile applications.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: PORTFOLIO_URL,
  },
  verification: {
    google: '',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='scroll-smooth'>
      <head>
        <link rel='canonical' href={PORTFOLIO_URL} />
        <meta name='theme-color' content='#0a0a0a' />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable} font-sans bg-[#0a0a0a] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
