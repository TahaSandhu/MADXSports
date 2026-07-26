import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../../../core/db";
import ProductModel from "../../../../../models/product/Product";
import { requireAdmin } from "../../../../../middleware/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const auth = requireAdmin(req, res);
  if (!auth) return;

  try {
    await connectDataBase();
    const { id } = req.query;

    const product = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (err) {
    console.error("update product error:", err);
    return res.status(500).json({ message: "Error updating product" });
  }
}
