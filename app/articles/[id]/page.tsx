import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface ArticleProps {
  frontmatter: {
    title: string;
    date: string;
  };
  content: string;
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content/articles'));
  const paths = files.map((filename) => ({
    params: {
      id: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }: { params: { id: string } }) {
  const markdownWithMeta = fs.readFileSync(path.join('content/articles', `${id}.md`), 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMeta);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      frontmatter,
      content: contentHtml,
    },
  };
}

export default function Article({ frontmatter: { title, date }, content }: ArticleProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="mb-4">{date}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
