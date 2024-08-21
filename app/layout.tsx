  import './globals.css';
  import { ReactNode } from 'react';
  import Header from './components/Header';
  import Footer from './components/Footer';
  import SessionProviderWrapper from './components/SessionProviderWrapper';

  export default function RootLayout({ children }: { children: ReactNode }) {
    return (
      <html lang="en">
        <body>
          <SessionProviderWrapper>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </SessionProviderWrapper>
        </body>
      </html>
    );
  }
