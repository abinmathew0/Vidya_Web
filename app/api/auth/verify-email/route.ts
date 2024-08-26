import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Use the URL constructor to parse the request URL and retrieve the token
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return NextResponse.json({ message: 'Token is missing' }, { status: 400 });
    }

    const user = await User.findOne({ _id: token });

    if (!user) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }

    user.emailVerified = true;
    await user.save();

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/auth/welcome`);
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
