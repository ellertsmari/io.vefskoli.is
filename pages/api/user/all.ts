// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Schema, model, connect, Types, InferSchemaType } from 'mongoose'
import { connectToDatabase } from '@/utils/mongoose-connector';

const userSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, required: true},
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
  __v: {type:Schema.Types.Number, required: true}
})

type UserType = InferSchemaType<typeof userSchema>

const User = model('User', userSchema);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserType[]>
) {
  await connectToDatabase();
  const users = await User.find();
  res.status(200).json(users);
}
