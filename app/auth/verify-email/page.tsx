'use client';

import { useRouter } from 'next/navigation';
import Loading from '../../components/Loading';
import { Suspense } from 'react';

export default function VerifyEmailPage() {
  const router = useRouter();

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-lightCream">
        <h1 className="text-3xl font-bold text-darkRed mb-6">Verify Your Email</h1>
        <p className="mb-4 text-burntOrange">Please check your email inbox for the verification link.</p>
        <button
          onClick={() => router.push('/auth/signin')}
          className="bg-darkRed text-lightCream px-4 py-2 rounded hover:bg-burntOrange transition duration-300"
        >
          Sign In
        </button>
      </div>
    </Suspense>
  );
}
