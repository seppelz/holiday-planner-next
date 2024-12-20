import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata = {
  title: 'Holiday Planner - Intelligente Urlaubsplanung für Deutschland',
  description: 'Planen Sie Ihren Urlaub intelligent mit Holiday Planner. Finden Sie die besten Brückentage und maximieren Sie Ihre Urlaubstage.',
};

// Force static rendering and disable dynamic routes
export const dynamic = 'error';
export const dynamicParams = false;
export const revalidate = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
