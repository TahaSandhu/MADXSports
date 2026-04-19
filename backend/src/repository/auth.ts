import UserModel from "../model/auth/model";
import { IUser } from "../model/auth/schema";


export const getUserByEmail = (email: string) =>
  UserModel.findOne({ email }).exec();

export const createUser = (data: Partial<IUser>) =>
  new UserModel(data).save();

export const updateOtpByEmail = (
  email: string,
  otp: string,
  otpExpires: Date
) =>
  UserModel.findOneAndUpdate(
    { email },
    { otp, otpExpires },
    { new: true }
  ).exec();

export const verifyUser = (email: string) =>
  UserModel.findOneAndUpdate(
    { email },
    { isVerified: true, otp: null, otpExpires: null },
    { new: true }
  ).exec();