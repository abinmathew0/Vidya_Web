'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false); // Close the menu when a link is clicked
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full bg-lightCream p-6 flex justify-between items-center z-50 transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="text-xl font-bold text-darkRed">
        <Link href="/">Vidya Writes</Link>
      </div>
      <nav className="relative">
        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            className="text-darkRed focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link href="/" className="text-darkRed hover:text-burntOrange">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-darkRed hover:text-burntOrange">
              About Me
            </Link>
          </li>
          <li>
            <Link
              href="/articles"
              className="text-darkRed hover:text-burntOrange"
            >
              My Work
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-darkRed hover:text-burntOrange">
              Contact
            </Link>
          </li>
          {status === 'authenticated' ? (
            <li className="relative">
              <button
                onClick={toggleMenu}
                className="text-darkRed hover:text-burntOrange flex items-center space-x-1"
              >
                <span>{session?.user?.name || session?.user?.email}</span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    menuOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="p-2">
                    <p className="text-gray-700">{session?.user?.email}</p>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="mt-2 w-full bg-darkRed hover:bg-burntOrange text-white py-1 px-2 rounded text-center"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link href="/auth/signin" className="text-darkRed hover:text-burntOrange">
                Sign In
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden fixed inset-0 top-16 bg-lightCream z-40 flex flex-col items-center space-y-6 pt-10">
            <li>
              <Link href="/" className="text-darkRed hover:text-burntOrange" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-darkRed hover:text-burntOrange" onClick={handleLinkClick}>
                About Me
              </Link>
            </li>
            <li>
              <Link href="/articles" className="text-darkRed hover:text-burntOrange" onClick={handleLinkClick}>
                My Work
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-darkRed hover:text-burntOrange" onClick={handleLinkClick}>
                Contact
              </Link>
            </li>
            {status === 'authenticated' ? (
              <li>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setMenuOpen(false);
                  }}
                  className="text-darkRed hover:text-burntOrange"
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <li>
                <Link href="/auth/signin" className="text-darkRed hover:text-burntOrange" onClick={handleLinkClick}>
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}
