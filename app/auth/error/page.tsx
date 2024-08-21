"use client";

import { useSearchParams, useRouter } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-lightCream">
      <h1 className="text-4xl font-extrabold text-darkRed mb-6">Oops!</h1>
      <p className="text-darkRed mb-4">
        {error ? error : "An unknown error occurred."}
      </p>
      <button
        onClick={() => router.push('/auth/signin')}
        className="bg-darkRed text-lightCream px-4 py-2 rounded hover:bg-burntOrange transition duration-300"
      >
        Go to Sign In
      </button>
    </div>
  );
}
