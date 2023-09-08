import { Document, Schema, model, models, InferSchemaType, Types} from "mongoose";

const reviewSchema = new Schema({
  guide: { type: Schema.Types.ObjectId, required: false, ref:"Guide" },
  return: { type: Schema.Types.ObjectId, required: true, ref:"Return" },
  owner: { type: Schema.Types.ObjectId, required: true, ref:"User" },
  comment: { type: Schema.Types.String, required: true },
  vote: { type: Schema.Types.String, required: true, enum:["no pass","pass", "recommend to gallery"] },
  createdAt: { type: Schema.Types.Date, required: true, default: Date.now },
  updatedAt: { type: Schema.Types.Date, required: false },
  commentAnswer: { type: Schema.Types.String, required: false },
  grade : { type: Schema.Types.Number, required: false },
});

export type ReviewType = InferSchemaType<typeof reviewSchema>

type ReviewDocument = ReviewType & Document;
export const Review = models.Review || model<ReviewDocument>("Review", reviewSchema);
