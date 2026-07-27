import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  verificationToken: string | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}