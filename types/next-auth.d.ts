// types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      emailVerified: boolean;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: string;
    emailVerified: boolean;
  }

  interface JWT {
    id: string;
    role: string;
    emailVerified: boolean;
  }
}
