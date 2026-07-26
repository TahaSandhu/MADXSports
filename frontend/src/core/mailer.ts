import nodemailer from "nodemailer";
import { generateOrderConfirmationTemplate, generateOtpEmailTemplate } from "./emailTemplate";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendOtpEmail = async (email: string, otp: string) => {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your MADXSports Verification Code",
        html: generateOtpEmailTemplate(otp),
    });
};

export const sendOrderConfirmationEmail = async (email: string, order: any) => {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your MADXSports Order Confirmation",
        html: generateOrderConfirmationTemplate(order),
    });
};
