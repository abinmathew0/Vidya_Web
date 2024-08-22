'use client';

import { useState, Suspense } from 'react';
import Loading from '../../components/Loading';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Password reset link sent to your email.');
      setError('');
    } else {
      setError(data.error || 'Failed to send password reset link.');
      setMessage('');
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-lightCream">
        <h1 className="text-4xl font-extrabold text-darkRed mb-6">Forgot Password</h1>
        {message && <p className="text-green-500 mb-4">{message}</p>}
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
          <button type="submit" className="bg-darkRed text-lightCream px-4 py-2 rounded hover:bg-burntOrange">
            Send Reset Link
          </button>
        </form>
      </div>
    </Suspense>
  );
}
