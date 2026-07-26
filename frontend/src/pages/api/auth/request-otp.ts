import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../core/db";
import UserModel from "../../../models/auth/User";
import { sendOtpEmail } from "../../../core/mailer";

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    await connectDataBase();

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = await UserModel.create({ email, otp, otpExpires });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    }

    await sendOtpEmail(email, otp);

    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("request-otp error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
