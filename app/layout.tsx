import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ModalProvider } from '@/components/providers/ModalProvider';

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dicsword',
  description:
    'A Discord like application for those homie calls and those homie gaming nights.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, 'bg-white dark:bg-[#313338]')}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-theme"
          >
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
