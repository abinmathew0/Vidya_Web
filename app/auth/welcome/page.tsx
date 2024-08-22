'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import Loading from '../../components/Loading';

export default function WelcomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-lightCream">
        <h1 className="text-4xl font-extrabold text-darkRed mb-6">Welcome, {session?.user?.email}!</h1>
        <p className="text-lg text-gray-600">Thank you for signing up. You can now explore the content and features of the site.</p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 bg-darkRed text-lightCream px-4 py-2 rounded hover:bg-burntOrange"
        >
          Go to Home
        </button>
      </div>
    </Suspense>
  );
}
