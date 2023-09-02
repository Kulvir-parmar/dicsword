import { ClerkProvider, SignedIn, UserButton } from '@clerk/nextjs';
import { Open_Sans } from 'next/font/google';
import { type Metadata } from 'next';
import './globals.css';
// eslint-disable-next-line import/extensions
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ModeToggle } from '@/components/ModeToggle';
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
            <header className="flex items-center h-20 gap-4 px-4">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <ModeToggle />
            </header>
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
