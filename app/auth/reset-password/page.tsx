'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '../../components/Loading';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/auth/error');
    }
  }, [token, router]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Password reset successfully');
      setError('');
      setTimeout(() => {
        router.push('/auth/signin');
      }, 2000);
    } else {
      setError(data.error || 'Failed to reset password');
      setMessage('');
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-lightCream">
        <h1 className="text-4xl font-extrabold text-darkRed mb-6">Reset Password</h1>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleResetPassword} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-darkRed text-sm font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-darkRed"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-darkRed text-sm font-bold mb-2">
              Confirm New Password
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
          <button type="submit" className="bg-darkRed text-lightCream px-4 py-2 rounded hover:bg-burntOrange">
            Reset Password
          </button>
        </form>
      </div>
    </Suspense>
  );
}
