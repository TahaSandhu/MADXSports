import { Schema, model, models } from "mongoose";
import { HeroSlideDocument } from "./schema";

const HeroSlideSchema = new Schema<HeroSlideDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tag: { type: String, required: true },
  },
  { timestamps: true }
);

const HeroSlideModel =
  models.HeroSlide || model<HeroSlideDocument>("HeroSlide", HeroSlideSchema);

export default HeroSlideModel;
