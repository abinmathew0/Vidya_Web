'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Article {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
  };
}

export default function ArticleManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.user || session.user.role !== 'admin') {
      router.push('/auth/signin');
    } else {
      fetch('/api/articles')
        .then((res) => res.json())
        .then((data) => setArticles(data));
    }
  }, [status, session, router]);

  if (status === 'loading') return <div>Loading...</div>;

  if (!session?.user || session.user.role !== 'admin') return null;

  return (
    <div className="container mx-auto p-4 min-h-screen bg-lightCream">
      <h1 className="text-4xl font-extrabold text-darkRed mb-6">Manage Articles</h1>
      <Link href="/admin/articles/new" className="bg-darkRed text-white px-4 py-2 rounded mb-4 inline-block hover:bg-burntOrange transition duration-300">
        Create New Article
      </Link>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.slug} className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <Link href={`/admin/articles/edit/${article.slug}`} className="text-darkRed font-semibold hover:underline">
              {article.frontmatter.title}
            </Link>
            <p className="text-gray-500">{article.frontmatter.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
