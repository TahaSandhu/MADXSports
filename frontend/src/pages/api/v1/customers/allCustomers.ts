import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../../core/db";
import UserModel from "../../../../models/auth/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    await connectDataBase();
    
    // Fetch all users with role 'user'
    const customers = await UserModel.find({ role: "user" }).sort({ createdAt: -1 });

    return res.status(200).json(customers);
  } catch (err) {
    console.error("allCustomers error:", err);
    return res.status(500).json({ message: "Error fetching customers" });
  }
}
