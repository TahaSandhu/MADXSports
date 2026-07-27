import nodemailer from "nodemailer";
import { generateVerificationEmailTemplate } from "./emailTemplate";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/auth/verify-email?token=${token}`;

  return transporter.sendMail({
    from: `"MADXSports" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your MADXSports account",
    html: generateVerificationEmailTemplate(email, verifyUrl),
  });
};

// export const sendOrderConfirmationEmail = async (
//   email: string,
//   html: string
// ) => {
//   return transporter.sendMail({
//     from: `"MADXSports" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Order Confirmation",
//     html,
//   });
// };