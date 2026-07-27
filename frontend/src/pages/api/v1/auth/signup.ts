import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

import connectDataBase from "../../../../core/db";
import UserModel from "../../../../models/auth/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    await connectDataBase();

    const {
      fullName,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const user = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (user) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = uuid();

    await UserModel.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    return res.status(201).json({
      message: "Account created successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}