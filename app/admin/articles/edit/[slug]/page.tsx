'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function EditArticle() {
  const { slug } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user || session.user.role !== 'admin') {
      router.push('/auth/signin');
    } else {
      fetch(`/api/articles/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.frontmatter.title);
          setContent(data.content);
        });
    }
  }, [session, slug, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/articles/${slug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push('/admin/articles');
    } else {
      console.error('Failed to update article');
    }
  };

  if (!session?.user || session.user.role !== 'admin') {
    return <p>Unauthorized</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Edit Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={10}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Article
        </button>
      </form>
    </div>
  );
}
