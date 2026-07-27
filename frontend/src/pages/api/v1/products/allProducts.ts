import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../../core/db";
import ProductModel from "../../../../models/product/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    await connectDataBase();

    const { category, isTrending, isNewRelease, search } = req.query;
    const filter: Record<string, any> = {};
    // if (category) filter.category = category;
    // if (isTrending) filter.isTrending = isTrending === "true";
    // if (isNewRelease) filter.isNewRelease = isNewRelease === "true";
    // if (search) filter.name = { $regex: search as string, $options: "i" };

console.log("MongoDB URI:", process.env.MONGODB_URI);
    const products = await ProductModel.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (err) {
    console.error("allProducts error:", err);
    return res.status(500).json({ message: "Error fetching products" });
  }
}
