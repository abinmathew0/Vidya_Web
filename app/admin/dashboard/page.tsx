'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import Loading from '../../components/Loading';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
      router.push('/404');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
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
        </div>
      </div>
    </Suspense>
  );
}
