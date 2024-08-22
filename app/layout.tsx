import './globals.css';
import { ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SessionProviderWrapper from './components/SessionProviderWrapper';
import Loading from './components/Loading';
import { Suspense } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <Header />
          <main>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
