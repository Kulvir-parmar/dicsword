import { ClerkProvider, SignedIn, UserButton } from '@clerk/nextjs';
import { Open_Sans } from 'next/font/google';
import { type Metadata } from 'next';
import './globals.css';

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
        <body className={`${OpenSans.className} min-h-screen flex flex-col`}>
          <header className="flex items-center h-20 gap-4 px-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>
          <main>{children}</main>
        </body>
      </ClerkProvider>
    </html>
  );
}
