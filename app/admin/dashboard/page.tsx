'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      // Prevent redirect while loading session data
      return;
    }

    if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
      // Redirect to the 404 page if the user is not authenticated or doesn't have the admin role
      router.push('/404');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    // Show loading while session is being fetched
    return <div>Loading...</div>;
  }

  if (status === 'authenticated' && session?.user?.role === 'admin') {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-lightCream">
        <h1 className="text-4xl font-extrabold text-darkRed mb-6">Admin Dashboard</h1>
        <div className="space-y-4">
          <button
            onClick={() => router.push('/admin/manage-users')}
            className="bg-darkRed text-lightCream mr-2 px-4 py-2 rounded hover:bg-burntOrange transition duration-300"
          >
            Manage Users
          </button>
          <button
            onClick={() => router.push('/admin/manage-articles')}
            className="bg-darkRed text-lightCream mr-2 px-4 py-2 rounded hover:bg-burntOrange transition duration-300"
          >
            Manage Articles
          </button>
          <button
            onClick={() => router.push('/admin/messages')}
            className="bg-darkRed text-lightCream mr-2 px-4 py-2 rounded hover:bg-burntOrange transition duration-300"
          >
            View Messages
          </button>
          {/* Add more admin buttons here */}
        </div>
      </div>
    );
  }

  return null;
}
