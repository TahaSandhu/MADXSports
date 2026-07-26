import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../../core/db";
import ProductModel from "../../../../models/product/Product";
import { requireAdmin } from "../../../../middleware/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const auth = requireAdmin(req, res);
  if (!auth) return;

  try {
    await connectDataBase();
    const product = await ProductModel.create(req.body);
    return res.status(201).json(product);
  } catch (err) {
    console.error("create product error:", err);
    return res.status(500).json({ message: "Error creating product" });
  }
}
