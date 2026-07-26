import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../../core/db";
import ReviewModel from "../../../../models/review/Review";
import ProductModel from "../../../../models/product/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    await connectDataBase();

    const { name, rating, comment, productId, avatarUrl, date } = req.body;

    if (!name || rating === undefined || !comment || !productId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = await ReviewModel.create({
      name,
      rating,
      comment,
      productId,
      avatarUrl,
      date: date || new Date().toISOString(),
    });

    // Recalculate average rating on the product
    const allReviews = await ReviewModel.find({ productId });
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    product.rating = Math.round(avgRating * 10) / 10;
    await product.save();

    return res.status(201).json(review);
  } catch (err) {
    console.error("addreviews error:", err);
    return res.status(500).json({ message: "Error adding review" });
  }
}
