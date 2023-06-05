import { Document, Schema, model, models, InferSchemaType } from 'mongoose'

const userSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, required: true},// we have Schema.Types for the schema but Types (from Mongoose) are for Mongoose documents
  active: {type: Schema.Types.Boolean, required: true},
  isAdmin: {type: Schema.Types.Boolean, required: true},
  name: {type: Schema.Types.String, required: true},
  email: {type: Schema.Types.String, required: true},
  password: {type: Schema.Types.String, required: true},
  background: {type: Schema.Types.String, required: true},
  careerGoals: {type: Schema.Types.String, required: true},
  interests: {type: Schema.Types.String, required: true},
  favoriteArtists: {type: Schema.Types.String, required: false},
  createdAt: {type: Schema.Types.Date, required: true},
  role: {type: Schema.Types.String, required: true},
  avatarUrl: {type: Schema.Types.String, required: true},
  __v: {type:Schema.Types.Number, required: true}
})


export type UserType = InferSchemaType<typeof userSchema> & {isLoggedIn?: boolean}
type UserDocument = UserType & Document
export const User =  (models as any).User || model<UserDocument>('User', userSchema);

