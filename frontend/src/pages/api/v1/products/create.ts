import type { NextApiRequest, NextApiResponse } from "next";
import connectDataBase from "../../../../core/db";
import ProductModel from "../../../../models/product/Product";
import { requireAdmin } from "../../../../middleware/auth";

import formidable from "formidable";
import cloudinary from "cloudinary";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      message: `Method ${req.method} not allowed`,
    });
  }

  const auth = requireAdmin(req, res);
  if (!auth) return;

  await connectDataBase();

  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: err.message,
      });
    }

    try {
      const uploadedImages: string[] = [];

      const imageFiles = Array.isArray(files.images)
        ? files.images
        : files.images
        ? [files.images]
        : [];

      for (const file of imageFiles) {
        const result = await cloudinary.v2.uploader.upload(file.filepath, {
          folder: "products",
        });

        uploadedImages.push(result.secure_url);

        fs.unlinkSync(file.filepath);
      }

      const product = await ProductModel.create({
        name: fields.name?.[0] || "",
        price: Number(fields.price?.[0] || 0),
        rating: Number(fields.rating?.[0] || 0),
        description: fields.description?.[0] || "",
        category: fields.category?.[0] || "",
        colors: JSON.parse(fields.colors?.[0] || "[]"),
        variants: JSON.parse(fields.variants?.[0] || "[]"),
        isTrending: fields.isTrending?.[0] === "true",
        isNewRelease: fields.isNewRelease?.[0] === "true",
        images: uploadedImages,
      });

      return res.status(201).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error creating product",
      });
    }
  });
}