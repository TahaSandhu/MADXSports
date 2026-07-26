import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import connectDataBase from "../../../core/db";
import HeroSlideModel from "../../../models/heroSlide/HeroSlide";
import { uploadMultipleImages } from "../../../core/cloudinaryUpload";
import { requireAdmin } from "../../../middleware/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseForm(req: NextApiRequest) {
  const form = formidable({ keepExtensions: true });
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
      const slides = await HeroSlideModel.find().sort({ createdAt: -1 });
      return res.status(200).json(slides);
    } catch (err) {
      console.error("get heroslides error:", err);
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

      let imageUrl = "";
      if (files.image) {
        const file = Array.isArray(files.image) ? files.image[0] : files.image;
        const [uploaded] = await uploadMultipleImages([file.filepath], "heroslides");
        imageUrl = uploaded;
      }

      const slide = await HeroSlideModel.create({
        title: getField(fields.title),
        description: getField(fields.description),
        tag: getField(fields.tag),
        image: imageUrl,
      });

      return res.status(201).json(slide);
    } catch (err) {
      console.error("create heroslide error:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
