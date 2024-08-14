import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../lib/dbConnect';
import Content from '../../../models/Content';

export async function POST(req) {
  const session = await getSession({ req });

  if (!session || session.user.role !== 'admin') {
    return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
  }

  await connectToDatabase();

  const { title, content } = await req.json();

  const newContent = new Content({ title, content });
  await newContent.save();

  return new Response(JSON.stringify(newContent), { status: 201 });
}
