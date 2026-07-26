import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  role: "user" | "admin";
  otp: string | null;
  otpExpires: Date | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
