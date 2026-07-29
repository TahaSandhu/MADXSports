import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../../../core/db";
import ReviewModel from "../../../../../models/review/Review";
import ProductModel from "../../../../../models/product/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    await connectDataBase();

    const { id } = req.query;
    const { name, rating, comment, avatarUrl, date } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Review ID is required" });
    }

    const review = await ReviewModel.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (name !== undefined) review.name = name;
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    if (avatarUrl !== undefined) review.avatarUrl = avatarUrl;
    if (date !== undefined) review.date = date;

    await review.save();

    // Recalculate average rating on the product
    const productId = review.productId;
    const allReviews = await ReviewModel.find({ productId });
    const product = await ProductModel.findById(productId);
    if (product) {
      if (allReviews.length > 0) {
        const avgRating =
          allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
        product.rating = Math.round(avgRating * 10) / 10;
      } else {
        product.rating = 0;
      }
      await product.save();
    }

    return res.status(200).json(review);
  } catch (err) {
    console.error("Update review error:", err);
    return res.status(500).json({ message: "Error updating review" });
  }
}
