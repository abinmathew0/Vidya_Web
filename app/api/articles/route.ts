import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  const files = fs.readdirSync(path.join('content/articles'));

  const articles = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('content/articles', filename), 'utf-8');
    const { data: frontmatter, content } = matter(markdownWithMeta);

    return {
      slug: filename.replace('.md', ''),
      frontmatter,
      content,
    };
  });

  return NextResponse.json(articles);
}

export async function POST(req: Request) {
  // Convert the Request object to one that getServerSession can use
  const session = await getServerSession({
    req: {
      headers: Object.fromEntries(req.headers),
      cookies: Object.fromEntries(req.headers.get('cookie')?.split('; ').map(cookie => cookie.split('=')) || []),
    },
    ...authOptions,
  });

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug, title, content } = await req.json();

  const filePath = path.join('content/articles', `${slug}.md`);
  const markdownContent = `---
title: "${title}"
---

${content}`;

  fs.writeFileSync(filePath, markdownContent);

  return NextResponse.json({ message: 'Article created' });
}
