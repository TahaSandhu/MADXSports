import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../core/db";
import ReviewModel from "../../../models/review/Review";
import ProductModel from "../../../models/product/Product";
import { requireAuth } from "../../../middleware/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDataBase();

  if (req.method === "GET") {
    try {
      const { productId } = req.query;
      const filter = productId ? { productId } : {};
      const reviews = await ReviewModel.find(filter).sort({ createdAt: -1 });
      return res.status(200).json(reviews);
    } catch (err) {
      console.error("get reviews error:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "POST") {
    const auth = requireAuth(req, res);
    if (!auth) return;

    try {
      const { name, rating, comment, productId, avatarUrl } = req.body;

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
        date: new Date().toISOString(),
      });

      // Recalculate average rating on the product
      const allReviews = await ReviewModel.find({ productId });
      const avgRating =
        allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
      product.rating = Math.round(avgRating * 10) / 10;
      await product.save();

      return res.status(201).json(review);
    } catch (err) {
      console.error("create review error:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
