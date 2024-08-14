'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Header() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full bg-lightCream p-6 flex justify-between items-center z-50 transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="text-xl font-bold text-darkRed">
        <Link href="/">Vidya Writes</Link>
      </div>
      <nav className="space-x-6">
        <Link href="/" className="text-darkRed hover:text-burntOrange">
          Home
        </Link>
        <Link href="/about" className="text-darkRed hover:text-burntOrange">
          About Me
        </Link>
        <Link href="/articles" className="text-darkRed hover:text-burntOrange">
          My Work
        </Link>
        <Link href="/contact" className="text-darkRed hover:text-burntOrange">
          Contact
        </Link>
        {status === 'authenticated' ? (
          <>
            <span className="text-darkRed">Signed in as {session?.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-darkRed hover:text-burntOrange"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/auth/signin" className="text-darkRed hover:text-burntOrange">
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}
