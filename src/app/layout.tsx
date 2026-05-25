import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import MouseGlowEffect from '@/components/MouseGlowEffect';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

const PORTFOLIO_URL = 'https://portfolio-xi-three-4uo4n9c.netlify.app';

export const metadata: Metadata = {
      metadataBase: new URL(PORTFOLIO_URL),
      title: {
          default: 'Avinash Reddy Kommareddy | Senior Flutter Engineer',
              template: '%s | Avinash Reddy Kommareddy',
      },
      description: 'Senior Flutter Engineer with 7+ years of experience building enterprise-grade cross-platform applications.',
      keywords: ['Avinash Reddy Kommareddy', 'Flutter Developer', 'Senior Flutter Engineer'],
      authors: [{ name: 'Avinash Reddy Kommareddy', url: PORTFOLIO_URL }],
      creator: 'Avinash Reddy Kommareddy',
      robots: { index: true, follow: true },
      openGraph: {
              type: 'website',
              locale: 'en_US',
              url: PORTFOLIO_URL,
              title: 'Avinash Reddy Kommareddy | Senior Flutter Engineer',
              description: 'Senior Flutter Engineer with 7+ years of experience.',
              images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      },
      twitter: {
              card: 'summary_large_image',
              title: 'Avinash Reddy Kommareddy | Senior Flutter Engineer',
              images: ['/og-image.png'],
      },
      alternates: { canonical: PORTFOLIO_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
      return (
              <html lang="en" className="scroll-smooth">
                    <head>
                            <meta name="theme-color" content="#0a0a0a" />
                    </head>
                        <body className={`${inter.variable} ${jetBrainsMono.variable} font-sans bg-[#0a0a0a] text-white antialiased`}>
                                    <MouseGlowEffect />
                            {children}
                        </body>
              </html>
            );
}
