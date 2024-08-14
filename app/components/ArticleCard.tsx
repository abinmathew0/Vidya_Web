import Link from 'next/link';

interface ArticleCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function ArticleCard({ slug, title, date, excerpt }: ArticleCardProps) {
  return (
    <div className="border border-gray-300 p-4 rounded mb-4">
      <h2 className="text-2xl font-bold mb-2">
        <Link href={`/articles/${slug}`} className="text-blue-500">
          {title}
        </Link>
      </h2>
      <p className="text-gray-600 mb-2">{date}</p>
      <p>{excerpt}</p>
    </div>
  );
}
