import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/utils/mongoose-connector';
import {User, type UserType} from '../../../models/user'



interface Error {
  message: string
}
interface Success { //only for the post call
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserType | Error | Success>
) {
  await connectToDatabase();
  if(req.method === "GET"){
    console.log(req.query);
    const user = await User.findOne({_id: req.query.uid});
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