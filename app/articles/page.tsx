import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import Loading from '../components/Loading';
import { Suspense } from 'react';

interface Article {
  slug: string;
  title: string;
  date: string;
}

export default async function Articles() {
  const files = fs.readdirSync(path.join('content/articles'));
  const articles: Article[] = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('content/articles', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug: filename.replace('.md', ''),
      title: frontmatter.title,
      date: frontmatter.date,
    };
  });

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Articles</h1>
        <ul>
          {articles.map((article) => (
            <li key={article.slug} className="mb-4">
              <Link href={`/articles/${article.slug}`} className="text-blue-500">
                {article.title}
              </Link>
              <p>{article.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
}
