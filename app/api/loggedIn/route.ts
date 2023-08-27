import { UserType } from "@/models/user";
import { getIronSession} from "iron-session/edge";
import { sessionOptions } from "@/utils/session";
import { NextRequest, NextResponse as res } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await getIronSession(req, res.next(), sessionOptions);
  console.log(session.user);
  if(session.user){
    res.json(session.user);
  }
  else{
    res.json({ message: "User not found", status: 500 });
  }
}