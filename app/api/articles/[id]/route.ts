import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(req: Request) {
  const { id } = req.params;
  const filePath = path.join('content/articles', `${id}.md`);

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

export async function POST(req: Request) {
  const session = await getSession({ req });
  if (!session || session.user.role !== 'author') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = req.params;
  const { title, content } = await req.json();

  const filePath = path.join('content/articles', `${id}.md`);
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

export async function DELETE(req: Request) {
  const session = await getSession({ req });
  if (!session || session.user.role !== 'author') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = req.params;
  const filePath = path.join('content/articles', `${id}.md`);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return NextResponse.json({ message: 'Article deleted' });
  } else {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
}
