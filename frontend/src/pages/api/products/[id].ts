import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import connectDataBase from "../../../core/db";
import ProductModel from "../../../models/product/Product";
import {
  uploadMultipleImages,
  deleteMultipleImages,
} from "../../../core/cloudinaryUpload";
import { requireAdmin } from "../../../middleware/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseForm(req: NextApiRequest) {
  const form = formidable({ multiples: true, keepExtensions: true });
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
    (resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    }
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDataBase();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const product = await ProductModel.findById(id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      return res.status(200).json(product);
    } catch (err) {
      console.error("get product error:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "PUT") {
    const auth = requireAdmin(req, res);
    if (!auth) return;

    try {
      const product = await ProductModel.findById(id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      const { fields, files } = await parseForm(req);
      const getField = (v: string | string[] | undefined) =>
        Array.isArray(v) ? v[0] : v;

      if (fields.name) product.name = getField(fields.name) as string;
      if (fields.price) product.price = Number(getField(fields.price));
      if (fields.description) product.description = getField(fields.description) as string;
      if (fields.category) product.category = getField(fields.category) as string;
      if (fields.isTrending) product.isTrending = getField(fields.isTrending) === "true";
      if (fields.isNewRelease) product.isNewRelease = getField(fields.isNewRelease) === "true";
      if (fields.colors) product.colors = JSON.parse(getField(fields.colors) as string);
      if (fields.variants) product.variants = JSON.parse(getField(fields.variants) as string);

      const imageFiles = files.images
        ? Array.isArray(files.images)
          ? files.images
          : [files.images]
        : [];
      if (imageFiles.length > 0) {
        const filePaths = imageFiles.map((f) => f.filepath);
        const uploadedUrls = await uploadMultipleImages(filePaths, "products");
        product.images = [...product.images, ...uploadedUrls];
      }

      await product.save();
      return res.status(200).json(product);
    } catch (err) {
      console.error("update product error:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "DELETE") {
    const auth = requireAdmin(req, res);
    if (!auth) return;

    try {
      const product = await ProductModel.findById(id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      await deleteMultipleImages(product.images);
      await product.deleteOne();

      return res.status(200).json({ message: "Product deleted" });
    } catch (err) {
      console.error("delete product error:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
