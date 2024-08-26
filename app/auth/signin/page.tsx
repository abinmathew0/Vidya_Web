'use client';

import { signIn } from 'next-auth/react';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { FaGoogle, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Loading from '../../components/Loading';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Update the type to string | null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl: '/'
    });

    if (result?.error) {
      setError(result.error); // Now, this correctly accepts a string
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-lightCream">
        <h1 className="text-4xl font-extrabold text-darkRed mb-6">Sign In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="email" className="block text-darkRed text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-darkRed"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-darkRed text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-darkRed"
              required
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <button type="submit" className="bg-darkRed text-lightCream px-4 py-2 rounded hover:bg-burntOrange w-full">
              Sign In
            </button>
          </div>
          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-sm text-darkRed hover:text-burntOrange underline">
              Forgot Password?
            </Link>
          </div>
        </form>
        <p className="mt-4">
          Don&#39;t have an account?{' '}
          <Link href="/auth/signup" className="text-darkRed hover:text-burntOrange underline">
            Sign Up
          </Link>
        </p>
        <div className="mt-6 space-y-2 w-full max-w-sm">
          <button
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center px-4 py-2 bg-[#DB4437] text-white rounded hover:bg-[#c23321] transition duration-300 text-sm"
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
          <button
            onClick={() => signIn('instagram')}
            className="w-full flex items-center justify-center px-4 py-2 bg-[#E1306C] text-white rounded hover:bg-[#b02255] transition duration-300 text-sm"
          >
            <FaInstagram className="mr-2" /> Sign in with Instagram
          </button>
          <button
            onClick={() => signIn('twitter')}
            className="w-full flex items-center justify-center px-4 py-2 bg-[#1DA1F2] text-white rounded hover:bg-[#1a91da] transition duration-300 text-sm"
          >
            <FaTwitter className="mr-2" /> Sign in with Twitter
          </button>
          <button
            onClick={() => signIn('linkedin')}
            className="w-full flex items-center justify-center px-4 py-2 bg-[#0077B5] text-white rounded hover:bg-[#005582] transition duration-300 text-sm"
          >
            <FaLinkedin className="mr-2" /> Sign in with LinkedIn
          </button>
        </div>
      </div>
    </Suspense>
  );
}
