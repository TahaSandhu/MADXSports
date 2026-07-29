import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../../../core/db";
import ReviewModel from "../../../../../models/review/Review";
import ProductModel from "../../../../../models/product/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE" && req.method !== "PUT") {
    res.setHeader("Allow", ["DELETE", "PUT"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    await connectDataBase();

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Review ID is required" });
    }

    const review = await ReviewModel.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const productId = review.productId;
    await ReviewModel.findByIdAndDelete(id);

    // Recalculate average rating on the product
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

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Delete review error:", err);
    return res.status(500).json({ message: "Error deleting review" });
  }
}
