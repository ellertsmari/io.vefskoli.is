import bcrypt from "bcrypt";
import { getIronSession} from "iron-session/edge";
import { sessionOptions } from "@/utils/session";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse as res } from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { User, UserType } from "@/models/user";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();

  try {
    connectToDatabase();
    const users = await User.find();
    console.log(email);
    const user = users.find((u: UserType) => u.email === email);
    if (!user) {
      return res.json({ message: "User was not found" }, {status:404});
      
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ message: "Password does not match" },{status:401});
    }

    const loggedInUser = { isLoggedIn: true, ...user } as UserType;
    const session = await getIronSession(req, res.next(), sessionOptions);
    session.user = loggedInUser;
    await session.save();
    //res.json(loggedInUser);
    return res.redirect("/guides");
  } catch (error) {
    console.log("there was an error", error);
    return res.json({ message: (error as Error).message }, { status: 500 });
  }
}

