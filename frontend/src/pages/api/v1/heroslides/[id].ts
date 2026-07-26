import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import connectDataBase from "../../../../../core/db";
import HeroSlideModel from "../../../../../models/heroSlide/HeroSlide";
import {
  uploadMultipleImages,
  deleteMultipleImages,
} from "../../../../../core/cloudinaryUpload";
import { requireAdmin } from "../../../../../middleware/auth";

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
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const slide = await HeroSlideModel.findById(id);
      if (!slide) return res.status(404).json({ message: "Slide not found" });
      return res.status(200).json(slide);
    } catch (err) {
      console.error("get heroslide error:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "PUT") {
    const auth = requireAdmin(req, res);
    if (!auth) return;

    try {
      const slide = await HeroSlideModel.findById(id);
      if (!slide) return res.status(404).json({ message: "Slide not found" });

      const { fields, files } = await parseForm(req);
      const getField = (v: string | string[] | undefined) =>
        Array.isArray(v) ? v[0] : v;

      if (fields.title) slide.title = getField(fields.title) as string;
      if (fields.description) slide.description = getField(fields.description) as string;
      if (fields.tag) slide.tag = getField(fields.tag) as string;

      if (files.image) {
        await deleteMultipleImages([slide.image]);
        const file = Array.isArray(files.image) ? files.image[0] : files.image;
        const [uploaded] = await uploadMultipleImages([file.filepath], "heroslides");
        slide.image = uploaded;
      }

      await slide.save();
      return res.status(200).json(slide);
    } catch (err) {
      console.error("update heroslide error:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "DELETE") {
    const auth = requireAdmin(req, res);
    if (!auth) return;

    try {
      const slide = await HeroSlideModel.findById(id);
      if (!slide) return res.status(404).json({ message: "Slide not found" });

      await deleteMultipleImages([slide.image]);
      await slide.deleteOne();

      return res.status(200).json({ message: "Slide deleted" });
    } catch (err) {
      console.error("delete heroslide error:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
