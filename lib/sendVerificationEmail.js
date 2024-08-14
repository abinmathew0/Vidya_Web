import nodemailer from "nodemailer";

export async function sendVerificationRequest(email, token) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const verificationLink = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your email address",
    text: `Click the following link to verify your email: ${verificationLink}`,
    html: `<p>Click the following link to verify your email:</p><p><a href="${verificationLink}">${verificationLink}</a></p>`,
  });
}
