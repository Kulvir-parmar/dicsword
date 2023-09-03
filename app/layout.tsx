import { ClerkProvider } from '@clerk/nextjs';
import { Open_Sans } from 'next/font/google';
import { type Metadata } from 'next';

import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';

const OpenSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dicsword',
  description:
    'A Discord like application for those homie calls and those homie gaming nights.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={cn(
            OpenSans.className,
            'min-h-screen flex flex-col bg-white dark:bg-[#313338]'
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="dick-theme"
          >
            {/* This was supposed to be the Navbar of the app but Not needed in dicsword */}
            {/* <header className="flex items-center h-20 gap-8 px-4">
              <ModeToggle />
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </header> */}

            <main>{children}</main>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
