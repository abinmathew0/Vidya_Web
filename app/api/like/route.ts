import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/authOptions';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function POST(req: Request) {
  try {
    // Use the correct way to get session with the app router
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { articleId } = await req.json();
    const filePath = path.join('content/articles', `${articleId}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(markdownWithMeta);

    if (frontmatter.likedBy && frontmatter.likedBy.includes(session.user.id)) {
      return NextResponse.json({ error: 'You have already liked this article' }, { status: 400 });
    }

    // Initialize or update the likedBy array
    if (!frontmatter.likedBy) {
      frontmatter.likedBy = [];
    }

    // Increment likes and add the user to likedBy array
    frontmatter.likes = (frontmatter.likes || 0) + 1;
    frontmatter.likedBy.push(session.user.id);

    // Rebuild the Markdown content
    const newMarkdownContent = matter.stringify(content, frontmatter);

    // Save the updated file
    fs.writeFileSync(filePath, newMarkdownContent);

    return NextResponse.json({ message: 'Like added', likes: frontmatter.likes });
  } catch (error) {
    console.error('Error processing like:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
