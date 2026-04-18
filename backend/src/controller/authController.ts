import { Request, Response } from "express";
import asyncHandler from "../utilts/asyncHandler";
import {
  getUserByEmail,
  createUser,
  updateOtpByEmail,
  verifyUser,
} from "../repository/auth";
import { sendOtpEmail } from "../utilts/otpMailer";

const sendOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  const user = await getUserByEmail(email);

  if (!user) {
    await createUser({
      email,
      otp,
      otpExpires,
      isVerified: false,
    } as any);
  } else {
    await updateOtpByEmail(email, otp, otpExpires);
  }

  try {
    await sendOtpEmail(email, otp);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to send OTP email",
    });
  }

  return res.status(200).json({
    message: "OTP sent successfully",
  });
});

const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (user.otpExpires && user.otpExpires < new Date()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  const verifiedUser = await verifyUser(email);

  return res.status(200).json({
    message: "Login successful",
    user: verifiedUser,
  });
});

const googleAuth = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  let user = await getUserByEmail(email);

  if (!user) {
    user = await createUser({
      email,
      isVerified: true,
    } as any);
  }

  return res.status(200).json({
    message: "Google login success",
    user,
  });
});

export {
  sendOtp,
  verifyOtp,
  googleAuth,
};