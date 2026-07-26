import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../../../core/db";
import ProductModel from "../../../../../models/product/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    await connectDataBase();
    const { id } = req.query;

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (err) {
    console.error("getProductById error:", err);
    return res.status(500).json({ message: "Error fetching product" });
  }
}
