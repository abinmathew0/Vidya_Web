import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import connectToDatabase from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User with this email does not exist' }, { status: 404 });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = Date.now() + 3600000; // Token valid for 1 hour

    // Store the token and expiration in the user's record
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    // Send the reset email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT as string),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    });

    return NextResponse.json({ message: 'Password reset link sent' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
