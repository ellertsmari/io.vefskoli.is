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
interface Error {
  message: string
}
interface Success { //only for the post call
  message: string
}

const User = model('User', userSchema);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserType | Error | Success>
) {
  await connectToDatabase();
  if(req.method === "GET"){
    const user = await User.findOne({_id: req.query._id});
    if (user === null) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  }
  else if(req.method === "POST"){
    await User.create(req.body);
    res.status(200).json({ message: 'User created successfully' });
  }else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
  
}