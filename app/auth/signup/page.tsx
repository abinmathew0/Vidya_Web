'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '../../components/Loading';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/auth/verify-email');
    } else {
      setError(data.error || 'Signup failed');
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-lightCream">
        <h1 className="text-4xl font-extrabold text-darkRed mb-6">Sign Up</h1>
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-darkRed text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-darkRed"
              required
            />
          </div>
          <button type="submit" className="bg-darkRed text-lightCream px-4 py-2 rounded hover:bg-burntOrange w-full">
            Sign Up
          </button>
        </form>
      </div>
    </Suspense>
  );
}
