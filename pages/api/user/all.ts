// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/utils/mongoose-connector';
import {User, UserType} from '../../../models/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserType[]>
) {
  await connectToDatabase();
  const users = await User.find();
  res.status(200).json(users);
}
