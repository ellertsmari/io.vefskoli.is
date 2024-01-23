import { Document, InferSchemaType, Schema, model, models, Types } from "mongoose";

const guideResourceSchema = new Schema({
    link: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
  });

  
export type Resources = InferSchemaType<typeof guideResourceSchema> & {
    isLoggedIn?: boolean;
  };
  //export type ResourceWithIdType = Resources;
 export type ResourceWithIdType = Resources & { _id: Types.ObjectId };  // As it was when filtered (being able to choose one) by id pr module pr guide
  type UserDocument = Resources & Document;
  export const Resources = models.Resources || model<UserDocument>("Resources", guideResourceSchema);
 