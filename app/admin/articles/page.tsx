'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ArticleManagement() {
  const { data: session } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!session || session.user.role !== 'author') {
      router.push('/auth/signin');
    } else {
      // Fetch articles for the author
      fetch('/api/articles')
        .then(res => res.json())
        .then(data => setArticles(data));
    }
  }, [session, router]);

  if (!session) return null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Manage Articles</h1>
      <Link href="/admin/articles/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Create New Article
      </Link>
      <ul>
        {articles.map(article => (
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
