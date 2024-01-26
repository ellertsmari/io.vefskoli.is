import { UserType } from "@/models/user";
import bcrypt from "bcrypt";
import { getIronSession} from "iron-session/edge";
import { sessionOptions } from "@/utils/session";
import { NextApiRequest, NextApiResponse } from "next";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {


  try {
    
    const session = await getIronSession(req, res, sessionOptions);
    session.destroy();
    await session.save();
    res.redirect("/authpage");
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

