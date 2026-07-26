import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../../core/db";
import UserModel from "../../../../models/auth/User";
import { requireAuth } from "../../../../middleware/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const auth = requireAuth(req, res);
  if (!auth) return;

  try {
    await connectDataBase();
    const user = await UserModel.findById(auth.id).select("-otp -otpExpires");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("me error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
