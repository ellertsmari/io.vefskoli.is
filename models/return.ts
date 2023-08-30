import { Document, Schema, model, models, InferSchemaType, Types} from "mongoose";

const returnSchema = new Schema({
  projectUrl: { type: Schema.Types.String, required: true },
  liveVersion: { type: Schema.Types.String, required: false },
  pictureUrl: { type: Schema.Types.String, required: false },
  projectName: { type: Schema.Types.String, required: false },
  comment: { type: Schema.Types.String, required: false },
  owner: { type: Schema.Types.ObjectId, required: true, ref:"User" },
  createdAt: { type: Schema.Types.Date, required: true, default: Date.now },
  guide:{ type: Schema.Types.ObjectId, required: true, ref:"Guide" },
});

export type ReturnType = InferSchemaType<typeof returnSchema>

type ReturnDocument = ReturnType & Document;
export const Return = models.Return || model<ReturnDocument>("Return", returnSchema);
