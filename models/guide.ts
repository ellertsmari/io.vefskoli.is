import { Document, InferSchemaType, Schema, model, models } from "mongoose";

const guideReferenceSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  type: { type: Schema.Types.String, required: true },
  name: { type: Schema.Types.String, required: true },
  link: { type: Schema.Types.String, required: true },
  createdAt: { type: Schema.Types.Date, required: true },
  updatedAt: { type: Schema.Types.Date, required: true },
  __v: { type: Schema.Types.Number, required: true },
});

const guideClassSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  title: { type: Schema.Types.String, required: true },
  link: { type: Schema.Types.String, required: true },
  createdAt: { type: Schema.Types.Date, required: true },
  updatedAt: { type: Schema.Types.Date, required: true },
  __v: { type: Schema.Types.Number, required: true },
});

const guideModuleSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  title: { type: Schema.Types.String, required: true },
  uid: { type: Schema.Types.String, required: true },
  createdAt: { type: Schema.Types.Date, required: true },
  updatedAt: { type: Schema.Types.Date, required: true },
  __v: { type: Schema.Types.Number, required: true },
});

const guideThemeIdeaSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  title: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  createdAt: { type: Schema.Types.Date, required: true },
  updatedAt: { type: Schema.Types.Date, required: true },
  __v: { type: Schema.Types.Number, required: true },
});

const guideKnowledgeSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  knowledge: { type: Schema.Types.String, required: true },
  createdAt: { type: Schema.Types.Date, required: true },
  updatedAt: { type: Schema.Types.Date, required: true },
  __v: { type: Schema.Types.Number, required: true },
});

const guideSkillSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  skill: { type: Schema.Types.String, required: true },
  createdAt: { type: Schema.Types.Date, required: true },
  updatedAt: { type: Schema.Types.Date, required: true },
  __v: { type: Schema.Types.Number, required: true },
});

const guideResourceSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  link: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  createdAt: { type: Schema.Types.Date, required: true },
  updatedAt: { type: Schema.Types.Date, required: true },
  __v: { type: Schema.Types.Number, required: true },
});

const guideSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true }, // we have Schema.Types for the schema but Types (from Mongoose) are for Mongoose documents
  category: { type: Schema.Types.String, required: true },
  references: { type: [guideReferenceSchema], required: true },
  uid: { type: Schema.Types.String, required: true },
  title: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  knowledge: { type: [guideKnowledgeSchema], required: true },
  skills: { type: [guideSkillSchema], required: true },
  resources: { type: [guideResourceSchema], required: true },
  createdAt: { type: Schema.Types.Date, required: true },
  updatedAt: { type: Schema.Types.Date, required: true },
  __v: { type: Schema.Types.Number, required: true },
  themeIdea: { type: guideThemeIdeaSchema, required: true },
  topicsList: { type: Schema.Types.String, required: true },
  module: { type: guideModuleSchema, required: true },
  classes: { type: [guideClassSchema], required: true },
  id: { type: Schema.Types.String, required: true },
});

export type GuideType = InferSchemaType<typeof guideSchema>;

export const Guide = models.Guide || model<GuideType>("Guide", guideSchema);
