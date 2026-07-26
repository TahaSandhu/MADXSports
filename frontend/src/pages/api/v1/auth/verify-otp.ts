import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../../core/db";
import UserModel from "../../../../models/auth/User";
import { generateToken } from "../../../../core/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    await connectDataBase();

    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!user.otpExpires || user.otpExpires.getTime() < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Frontend expects { user, token } in the body - it stores token in
    // localStorage and sends it back as a raw Authorization header (no cookie).
    const token = generateToken(user);

    return res.status(200).json({
      message: "Verified successfully",
      user: { id: user._id, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error("verify-otp error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
