import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  otp?: string;
  otpExpires?: Date;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
