import { Document } from "mongoose";

export interface HeroSlideDocument extends Document {
  title: string;
  description: string;
  image: string;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
}
