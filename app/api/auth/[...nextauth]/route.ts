// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '../../../../lib/authOptions'; // Update the path based on your project structure

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
