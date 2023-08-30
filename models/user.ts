import { Document, Schema, model, models, InferSchemaType, Types} from "mongoose";

const userSchema = new Schema({
  name: { type: Schema.Types.String, required: true },
  email: { type: Schema.Types.String, required: true },
  password: { type: Schema.Types.String, required: true },
  background: { type: Schema.Types.String, required: false },
  careerGoals: { type: Schema.Types.String, required: false },
  interests: { type: Schema.Types.String, required: false },
  favoriteArtists: { type: Schema.Types.String, required: false },
  createdAt: { type: Schema.Types.Date, required: true },
  role: { type: Schema.Types.String, required: true },
  avatarUrl: { type: Schema.Types.String, required: false }
});

export type UserType = InferSchemaType<typeof userSchema> & {
  isLoggedIn?: boolean;
};
export type UserWithIdType = UserType & { _id: Types.ObjectId };
type UserDocument = UserType & Document;
export const User = models.User || model<UserDocument>("User", userSchema);
