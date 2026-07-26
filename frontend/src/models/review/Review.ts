import { Schema, model, models } from "mongoose";
import { ReviewDocument } from "./schema";

const ReviewSchema = new Schema<ReviewDocument>(
  {
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, required: true },
    date: { type: String, required: true },
    avatarUrl: { type: String, default: "https://i.pravatar.cc/150" },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const ReviewModel = models.Review || model<ReviewDocument>("Review", ReviewSchema);

export default ReviewModel;
