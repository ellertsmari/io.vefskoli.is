import { Document, Schema, model, models } from "mongoose";

const guideSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  Title: { type: Schema.Types.String, required: true },
  Description: { type: Schema.Types.String, required: true },
});

type GuideDocument = Document;
export const Guide =
  (models as any).Guide || model<GuideDocument>("Guide", guideSchema);
