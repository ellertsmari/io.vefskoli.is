import { Document, InferSchemaType, Schema, model, models } from "mongoose";

const guideReferenceSchema = new Schema({
  type: { type: Schema.Types.String, required: true },
  name: { type: Schema.Types.String, required: true },
  link: { type: Schema.Types.String, required: true },
});
//todo: combine guideClassSchema and guideResourcesSchema into  guideReferencesSchema
const guideClassSchema = new Schema({
  title: { type: Schema.Types.String, required: true },
  link: { type: Schema.Types.String, required: true },
});

const guideModuleSchema = new Schema({
  title: { type: Schema.Types.String, required: true },
});

const guideThemeIdeaSchema = new Schema({
  title: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true},
});

const guideKnowledgeSchema = new Schema({
  knowledge: { type: Schema.Types.String, required: true },
});

const guideSkillSchema = new Schema({
  skill: { type: Schema.Types.String, required: true },
});

const guideResourceSchema = new Schema({
  link: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
});

const guideSchema = new Schema({
  category:     { type: Schema.Types.String,    required: true },
  references:   { type: [guideReferenceSchema], required: true },
  title:        { type: Schema.Types.String,    required: true },
  description:  { type: Schema.Types.String,    required: true },
  knowledge:    { type: [guideKnowledgeSchema], required: true },
  skills:       { type: [guideSkillSchema],     required: true },
  resources:    { type: [guideResourceSchema],  required: true },
  createdAt:    { type: Schema.Types.Date,      required: true },
  updatedAt:    { type: Schema.Types.Date,      required: true },
  themeIdea:    { type: guideThemeIdeaSchema,   required: true },
  topicsList:   { type: Schema.Types.String,    required: true },
  module:       { type: guideModuleSchema,      required: true },
  classes:      { type: [guideClassSchema],     required: true },
  order:        { type: Schema.Types.Number,    required: true },
});

export type GuideType = InferSchemaType<typeof guideSchema>;

type GuideDocument = GuideType & Document;
export const Guide = models.Guide || model<GuideDocument>("Guide", guideSchema);
