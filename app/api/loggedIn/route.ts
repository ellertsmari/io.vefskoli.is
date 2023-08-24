import { UserType } from "@/models/user";
import { getIronSession} from "iron-session/edge";
import { sessionOptions } from "@/utils/session";
import { NextApiRequest, NextApiResponse } from "next";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getIronSession(req, res, sessionOptions);
  if(session.user){
    res.json(session.user);
  }
  else{
    res.status(500).json({ message: "User not found" });
  }
}