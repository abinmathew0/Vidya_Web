import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../lib/authOptions'; // Update the path based on your project structure
import connectToDatabase from '../../../lib/dbConnect';
import Content from '../../../models/Content';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  await connectToDatabase();

  const { title, content } = await req.json();

  const newContent = new Content({ title, content });
  await newContent.save();

  return NextResponse.json(newContent, { status: 201 });
}
