// lib/authOptions.ts
import { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import InstagramProvider from 'next-auth/providers/instagram';
import TwitterProvider from 'next-auth/providers/twitter';
import LinkedInProvider from 'next-auth/providers/linkedin';
import CredentialsProvider from 'next-auth/providers/credentials';
import nodemailer from 'nodemailer';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from './mongodb'; // Update the path based on your project structure
import connectToDatabase from './dbConnect'; // Update the path based on your project structure
import User from '../models/User';
import bcrypt from 'bcrypt';

// Defining the NextAuth configuration object with the correct type
export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST || '',
        port: Number(process.env.EMAIL_SERVER_PORT) || 587,
        auth: {
          user: process.env.EMAIL_SERVER_USER || '',
          pass: process.env.EMAIL_SERVER_PASSWORD || '',
        },
      },
      from: process.env.EMAIL_FROM || '',
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        const { host } = new URL(url);
        const transport = nodemailer.createTransport({
          host: process.env.EMAIL_SERVER_HOST || '',
          port: Number(process.env.EMAIL_SERVER_PORT) || 587,
          auth: {
            user: process.env.EMAIL_SERVER_USER || '',
            pass: process.env.EMAIL_SERVER_PASSWORD || '',
          },
        });

        console.log('Attempting to send verification email to:', email);
        console.log('Email URL:', url);

        await transport
          .sendMail({
            to: email,
            from: provider.from,
            subject: `Verify your email for ${host}`,
            text: `Please verify your email address for ${host}\n${url}\n\n`,
            html: `<p>Verify your email address for ${host}</p><p><a href="${url}">Click here to verify your email</a></p>`,
          })
          .then((info) => {
            console.log('Email sent successfully:', info.response);
          })
          .catch((error) => {
            console.error('Error sending email:', error);
          });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID || '',
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || '',
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials?.email });

        if (user) {
          if (!user.emailVerified) {
            throw new Error('Please verify your email before logging in.');
          }

          const isPasswordValid = await bcrypt.compare(credentials?.password || '', user.password);
          if (isPasswordValid) {
            return user;
          }
        }
        throw new Error('Invalid credentials');
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
    maxAge: 604800, // 7 days in seconds
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.emailVerified = token.emailVerified as boolean;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url === '/auth/verify-email') {
        return url;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET || '',
};

export default authOptions;
