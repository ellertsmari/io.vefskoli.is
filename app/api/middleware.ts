/*
import bcrypt from "bcrypt";
import { getIronSession} from "iron-session/edge";
import { sessionOptions } from "@/utils/session";
import { NextResponse} from "next/server";
import type { NextRequest } from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { User, UserType } from "@/models/user";

export const middleware = async (req: NextRequest) => {
  if( req.method === "POST" && req.nextUrl.pathname.startsWith("/api/auth/login") ){
    const { email, password } = await req.json();
    const res = NextResponse.next();
    try {
      connectToDatabase();
      const users = await User.find();
      console.log(email);
      const user = users.find((u: UserType) => u.email === email);
      if (!user) {
        return NextResponse.json({ message: "User was not found" }, {status:404});
        
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return NextResponse.json({ message: "Password does not match" },{status:401});
      }

      const loggedInUser = { isLoggedIn: true, ...user } as UserType;
      console.log(sessionOptions);
      const session = await getIronSession(req, res, sessionOptions);
      session.user = loggedInUser;
      //console.log(session);
    
      await session.save();
    
      //res.json(loggedInUser);
      return res
    } catch (error) {
      console.log("there was an error", error);
      return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
  }
}
*/
