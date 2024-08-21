import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const token = req.nextUrl.searchParams.get('token');

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
