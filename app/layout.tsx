import type {Metadata} from 'next';
import { Inter, Playfair_Display, Aref_Ruqaa } from 'next/font/google';
import './globals.css';
import { WeddingProvider } from '@/components/WeddingProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const arabic = Aref_Ruqaa({ weight: ['400', '700'], subsets: ['arabic'], variable: '--font-arabic' });

export const metadata: Metadata = {
  title: 'Premium Muslim Wedding Invitation',
  description: 'An interactive luxury digital invitation',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${arabic.variable} bg-[#0f172a] text-white font-sans`}>
        <WeddingProvider>
          {children}
        </WeddingProvider>
      </body>
    </html>
  );
}
