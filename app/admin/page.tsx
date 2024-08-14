'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (session && session.user.role !== 'admin') {
      router.push('/');
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        throw new Error('Failed to create content');
      }

      setTitle('');
      setContent('');
    } catch (error) {
      setError(error.message);
    }
  };

  if (!session || session.user.role !== 'admin') {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-lightCream">
      <h1 className="text-4xl font-extrabold text-darkRed mb-6">Admin Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-darkRed text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-darkRed"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-darkRed text-sm font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-darkRed"
            rows={5}
            required
          />
        </div>
        <button type="submit" className="bg-darkRed text-lightCream px-4 py-2 rounded hover:bg-burntOrange">
          Create Content
        </button>
      </form>
    </div>
  );
}
