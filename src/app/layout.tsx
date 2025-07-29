import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Inter, Poppins } from 'next/font/google';

const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body' });
const headlineFont = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-headline' 
});

export const metadata: Metadata = {
  title: 'SkillSync',
  description: 'Find talent and work, powered by AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${headlineFont.variable} font-body antialiased min-h-screen bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
