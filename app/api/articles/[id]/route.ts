import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const getArticlePath = (slug: string) => path.join('content/articles', `${slug}.md`);

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const filePath = getArticlePath(id);

  if (fs.existsSync(filePath)) {
    const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(markdownWithMeta);

    return NextResponse.json({
      slug: id,
      frontmatter,
      content,
    });
  } else {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession({ req: request, ...authOptions });

  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const { title, content } = await request.json();
  const filePath = getArticlePath(id);

  if (fs.existsSync(filePath)) {
    const markdownContent = `---
title: "${title}"
---

${content}`;

    fs.writeFileSync(filePath, markdownContent);
    return NextResponse.json({ message: 'Article updated' });
  } else {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession({ req: request, ...authOptions });

  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const filePath = getArticlePath(id);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return NextResponse.json({ message: 'Article deleted' });
  } else {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
}
