'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({ redirect: false });
      router.push('/');
    };

    handleSignOut();
  }, [router]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Signing Out...</h1>
      <p>If you are not redirected, <a href="/" className="text-blue-500">click here</a>.</p>
    </div>
  );
}
