import { connectToDatabase } from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export async function GET(req) {
  await connectToDatabase();
  const token = req.nextUrl.searchParams.get('token');

  const user = await User.findOne({ _id: token });

  if (!user) {
    return new Response(JSON.stringify({ message: 'Invalid token' }), { status: 400 });
  }

  user.emailVerified = true;
  await user.save();

  return new Response(JSON.stringify({ message: 'Email verified successfully' }), { status: 200 });
}
