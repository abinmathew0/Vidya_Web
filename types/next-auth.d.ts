// types/next-auth.d.ts

import { DefaultSession, DefaultUser } from 'next-auth';

// Extending the built-in session interface
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      emailVerified: boolean;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    emailVerified: boolean;
  }

  interface JWT {
    id: string;
    role: string;
    emailVerified: boolean;
  }
}
