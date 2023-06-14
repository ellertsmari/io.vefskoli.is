import { Document, InferSchemaType, Schema, model, models } from "mongoose";

const guideSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true }, // we have Schema.Types for the schema but Types (from Mongoose) are for Mongoose documents
  Category: { type: Schema.Types.String, required: true },
  Status: { type: Schema.Types.String, required: true },
  references: { type: Schema.Types.Array, required: true },
  Complete: { type: Schema.Types.Boolean, required: true },
  UID: { type: Schema.Types.String, required: true },
  Title: { type: Schema.Types.String, required: true },
  Description: { type: Schema.Types.String, required: true },
  Delivery: { type: Schema.Types.String, required: true },
  Knowledge: { type: Schema.Types.Array, required: true },
  Skills: { type: Schema.Types.Array, required: true },
  actionPoints: { type: Schema.Types.Array, required: true },
  Resources: { type: Schema.Types.Array, required: true },
  Topics: { type: Schema.Types.Array, required: true },
  createdAt: { type: Schema.Types.Date, required: true },
  updatedAt: { type: Schema.Types.Date, required: true },
  __v: { type: Schema.Types.Number, required: true },
  Deliver: {
    _id: { type: Schema.Types.ObjectId, required: true },
    Title: { type: Schema.Types.String, required: true },
    Description: { type: Schema.Types.String, required: true },
    createdAt: { type: Schema.Types.Date, required: true },
    updatedAt: { type: Schema.Types.Date, required: true },
    __v: { type: Schema.Types.Number, required: true },
    id: { type: Schema.Types.String, required: true },
  },
  topicsList: { type: Schema.Types.String, required: true },
  project: {
    _id: { type: Schema.Types.ObjectId, required: true },
    Title: { type: Schema.Types.String, required: true },
    UID: { type: Schema.Types.String, required: true },
    createdAt: { type: Schema.Types.Date, required: true },
    updatedAt: { type: Schema.Types.Date, required: true },
    __v: { type: Schema.Types.Number, required: true },
    id: { type: Schema.Types.String, required: true },
  },
  Classes: { type: Schema.Types.Array, required: true },
  id: { type: Schema.Types.String, required: true },
});

export type GuideType = InferSchemaType<typeof guideSchema> & {
  isLoggedIn?: boolean;
};

export const Guide = models.Guide || model<GuideType>("Guide", guideSchema);
