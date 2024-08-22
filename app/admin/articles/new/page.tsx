'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function NewArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug, title, content }),
    });

    if (res.ok) {
      router.push('/admin/articles'); // Redirect back to article management after successful creation
    } else {
      console.error('Failed to create article');
    }
  };

  if (!session || session.user.role !== 'admin') {
    return <p>Unauthorized</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-lightCream min-h-screen">
      <h1 className="text-4xl font-bold text-darkRed mb-6">Create New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-darkRed text-lg font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded text-darkRed"
            placeholder="Enter article title"
            required
          />
        </div>
        <div>
          <label className="block text-darkRed text-lg font-semibold mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded text-darkRed"
            rows={10}
            placeholder="Write your article content here..."
            required
          />
        </div>
        <button
          type="submit"
          className="bg-darkRed text-lightCream px-4 py-2 rounded hover:bg-burntOrange transition duration-300"
        >
          Create Article
        </button>
      </form>
    </div>
  );
}
