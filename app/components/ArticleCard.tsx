import Link from 'next/link';

interface ArticleCardProps {
  slug: string;
  title: string;
  date: string;
  author: string;
  likes: number;
  commentsCount: number;
  excerpt: string;
}

export default function ArticleCard({
  slug,
  title,
  date,
  author,
  likes,
  commentsCount,
  excerpt,
}: ArticleCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
        <span>{author}</span>
      </div>
      <Link href={`/articles/${slug}`} className="block">
        <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200 mb-1">
          {title}
        </h2>
      </Link>
      <p className="text-gray-600 line-clamp-2">{excerpt}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
        <div className="flex items-center space-x-2">
          <span>{date}</span>
          <span>&bull;</span>
          <span>{likes} likes</span>
          <span>&bull;</span>
          <span>{commentsCount} comments</span>
        </div>
      </div>
    </div>
  );
}
