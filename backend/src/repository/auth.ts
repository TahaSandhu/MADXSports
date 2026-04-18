import UserModel from "../model/auth/model";
import { IUser } from "../model/auth/schema";


const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return UserModel.findOne({ email }).exec();
};

const getUserById = async (id: string): Promise<IUser | null> => {
  return UserModel.findById(id).exec();
};

const createUser = async (
  data: Omit<IUser, "_id" | "createdAt" | "updatedAt">
): Promise<IUser> => {
  const user = new UserModel(data);
  return user.save();
};

const updateUser = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  return UserModel.findByIdAndUpdate(id, data, {
    new: true,
  }).exec();
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  return UserModel.findByIdAndDelete(id).exec();
};

const updateOtpByEmail = async (
  email: string,
  otp: string,
  otpExpires: Date
): Promise<IUser | null> => {
  return UserModel.findOneAndUpdate(
    { email },
    { otp, otpExpires },
    { new: true }
  ).exec();
};

const verifyUser = async (email: string): Promise<IUser | null> => {
  return UserModel.findOneAndUpdate(
    { email },
    { isVerified: true, otp: null, otpExpires: null },
    { new: true }
  ).exec();
};

export {
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateOtpByEmail,
  verifyUser,
};