import { Document, InferSchemaType, Schema, model, models } from "mongoose";

const guideSchema = new Schema({
  _id: { type: Schema.Types.String, required: true }, // we have Schema.Types for the schema but Types (from Mongoose) are for Mongoose documents
  category: { type: Schema.Types.String, required: true },
  references: { type: Schema.Types.Array, required: true },
  uid: { type: Schema.Types.String, required: true },
  title: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  knowledge: { type: Schema.Types.Array, required: true },
  skills: { type: Schema.Types.Array, required: true },
  resources: { type: Schema.Types.Array, required: true },
  topics: { type: Schema.Types.Array, required: true },
  createdAt: { type: Schema.Types.Date, required: true },
  updatedAt: { type: Schema.Types.Date, required: true },
  __v: { type: Schema.Types.Number, required: true },
  themeIdea: {
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    createdAt: { type: Schema.Types.Date, required: true },
    updatedAt: { type: Schema.Types.Date, required: true },
    __v: { type: Schema.Types.Number, required: true },
    id: { type: Schema.Types.String, required: true },
  },
  topicsList: { type: Schema.Types.String, required: true },
  module: {
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: Schema.Types.String, required: true },
    uid: { type: Schema.Types.String, required: true },
    createdAt: { type: Schema.Types.Date, required: true },
    updatedAt: { type: Schema.Types.Date, required: true },
    __v: { type: Schema.Types.Number, required: true },
    id: { type: Schema.Types.String, required: true },
  },
  classes: { type: Schema.Types.Array, required: true },
  id: { type: Schema.Types.String, required: true },
});

export type GuideType = InferSchemaType<typeof guideSchema>;

export const Guide = models.Guide || model<GuideType>("Guide", guideSchema);
