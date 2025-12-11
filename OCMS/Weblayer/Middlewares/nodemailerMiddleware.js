import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
configDotenv();

export const sendMail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    },
  });
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    text,
    html
  };
  const info = await transporter.sendMail(mailOptions);
  return info;
};