import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next'; 
import { authOptions } from '../../../lib/authOptions'; 
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { articleId, comment } = await req.json();
  const filePath = path.join('content/articles', `${articleId}-comments.json`);

  const comments = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : [];
  comments.push({
    id: uuidv4(),
    text: comment,
    author: session.user.email,
    date: new Date(),
  });

  fs.writeFileSync(filePath, JSON.stringify(comments, null, 2));

  return NextResponse.json({ message: 'Comment added' });
}
