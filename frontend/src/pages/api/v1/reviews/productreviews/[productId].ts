import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../../../core/db";
import ReviewModel from "../../../../../models/review/Review";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    await connectDataBase();
    const { productId } = req.query;

    const reviews = await ReviewModel.find({ productId }).sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  } catch (err) {
    console.error("productreviews error:", err);
    return res.status(500).json({ message: "Error fetching reviews" });
  }
}
