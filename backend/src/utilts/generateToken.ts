import * as jwt from "jsonwebtoken";
import { IUser } from "../model/auth/schema";


export const generateToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
};