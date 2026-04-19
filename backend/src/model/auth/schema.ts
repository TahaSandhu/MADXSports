import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  role: "user" | "admin";
  otp?: string;
  otpExpires?: Date;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}