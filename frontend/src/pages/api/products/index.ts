import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import connectDataBase from "../../../core/db";
import ProductModel from "../../../models/product/Product";
import { uploadMultipleImages } from "../../../core/cloudinaryUpload";
import { requireAdmin } from "../../../middleware/auth";

// Required so Next.js doesn't try to parse the body itself - formidable handles it
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

  if (req.method === "GET") {
    try {
      const { category, isTrending, isNewRelease, search } = req.query;

      const filter: Record<string, any> = {};
      if (category) filter.category = category;
      if (isTrending) filter.isTrending = isTrending === "true";
      if (isNewRelease) filter.isNewRelease = isNewRelease === "true";
      if (search) filter.name = { $regex: search as string, $options: "i" };

      const products = await ProductModel.find(filter).sort({ createdAt: -1 });
      return res.status(200).json(products);
    } catch (err) {
      console.error("get products error:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "POST") {
    const auth = requireAdmin(req, res);
    if (!auth) return;

    try {
      const { fields, files } = await parseForm(req);

      const getField = (v: string | string[] | undefined) =>
        Array.isArray(v) ? v[0] : v;

      const imageFiles = files.images
        ? Array.isArray(files.images)
          ? files.images
          : [files.images]
        : [];
      const filePaths = imageFiles.map((f) => f.filepath);
      const uploadedUrls = await uploadMultipleImages(filePaths, "products");

      const product = await ProductModel.create({
        name: getField(fields.name),
        price: Number(getField(fields.price)),
        description: getField(fields.description),
        category: getField(fields.category),
        isTrending: getField(fields.isTrending) === "true",
        isNewRelease: getField(fields.isNewRelease) === "true",
        colors: fields.colors
          ? JSON.parse(getField(fields.colors) as string)
          : [],
        variants: fields.variants
          ? JSON.parse(getField(fields.variants) as string)
          : [],
        images: uploadedUrls,
      });

      return res.status(201).json(product);
    } catch (err) {
      console.error("create product error:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
