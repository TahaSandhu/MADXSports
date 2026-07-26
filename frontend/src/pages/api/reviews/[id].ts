import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../core/db";
import ReviewModel from "../../../models/review/Review";
import ProductModel from "../../../models/product/Product";
import { requireAdmin } from "../../../middleware/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDataBase();
  const { id } = req.query;

  if (req.method === "DELETE") {
    const auth = requireAdmin(req, res);
    if (!auth) return;

    try {
      const review = await ReviewModel.findById(id);
      if (!review) return res.status(404).json({ message: "Review not found" });

      const productId = review.productId;
      await review.deleteOne();

      // Recalculate average rating after deletion
      const remaining = await ReviewModel.find({ productId });
      const product = await ProductModel.findById(productId);
      if (product) {
        product.rating =
          remaining.length > 0
            ? Math.round(
                (remaining.reduce((sum, r) => sum + r.rating, 0) / remaining.length) * 10
              ) / 10
            : 0;
        await product.save();
      }

      return res.status(200).json({ message: "Review deleted" });
    } catch (err) {
      console.error("delete review error:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  res.setHeader("Allow", ["DELETE"]);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
