import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import ArticleCard from '../components/ArticleCard';

interface Article {
  slug: string;
  title: string;
  date: string;
  author: string;
  likes: number;
  commentsCount: number;
  excerpt: string;
}

export default function Articles() {
  const articles = getArticles();

  return (
    <div className="min-h-screen container mx-auto px-4 py-6 bg-lightCream mt-16"> {/* Added mt-16 for top spacing */}
      <h1 className="text-4xl font-extrabold text-darkRed mb-6 text-center">Articles</h1>
      <div className="flex flex-col items-center gap-6"> {/* Center-aligns the articles */}
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="block w-10/12 lg:w-8/12 xl:w-7/12 transform hover:scale-105 transition-transform duration-300" // Width set to 70% on larger screens
          >
            <ArticleCard
              slug={article.slug}
              title={article.title}
              date={article.date}
              author={article.author}
              likes={article.likes}
              commentsCount={article.commentsCount}
              excerpt={article.excerpt}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

// Server-side data fetching function for articles
function getArticles(): Article[] {
  const files = fs.readdirSync(path.join('content/articles'));
  const articles: Article[] = files
    .filter((filename) => !filename.includes('-comments')) // Ignore comment files
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(path.join('content/articles', filename), 'utf-8');
      const { data: frontmatter, content } = matter(markdownWithMeta);
      const excerpt = content.split('\n').slice(0, 3).join(' ') + '...';

      return {
        slug: filename.replace('.md', ''),
        title: frontmatter.title,
        date: frontmatter.date,
        author: frontmatter.author || 'Unknown Author', // Handle missing author
        likes: frontmatter.likes || 0, // Handle missing likes
        commentsCount: frontmatter.commentsCount || 0, // Handle missing commentsCount
        excerpt,
      };
    });

  return articles;
}
