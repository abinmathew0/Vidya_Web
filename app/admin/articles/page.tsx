'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ArticleManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (status === 'loading') return; // Prevent redirect while loading session data

    if (!session || session.user.role !== 'admin') {
      router.push('/auth/signin'); // Redirect to sign-in if not admin
    } else {
      // Fetch articles only if session is valid and user is admin
      fetch('/api/articles')
        .then((res) => res.json())
        .then((data) => setArticles(data));
    }
  }, [status, session, router]);

  if (status === 'loading') return <div>Loading...</div>; // Show loading spinner while session is being fetched

  if (!session || session.user.role !== 'admin') return null; // Prevent rendering for non-admin users

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Manage Articles</h1>
      <Link href="/admin/articles/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Create New Article
      </Link>
      <ul>
        {articles.map((article) => (
          <li key={article.slug} className="mb-4">
            <Link href={`/admin/articles/edit/${article.slug}`} className="text-blue-500">
              {article.frontmatter.title}
            </Link>
            <p>{article.frontmatter.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
