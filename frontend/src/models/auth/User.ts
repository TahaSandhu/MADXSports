import { Schema, model, models } from "mongoose";
import { IUser } from "./schema";

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// `models.User ||` prevents Next.js hot-reload from re-registering the model
const UserModel = models.User || model<IUser>("User", UserSchema);

export default UserModel;
