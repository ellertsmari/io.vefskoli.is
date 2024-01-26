import bcrypt from "bcrypt";
import { sealData } from "iron-session/edge";
import { NextResponse} from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { User, UserType } from "@/models/user";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();
  const res = NextResponse.next();
  try {
    await connectToDatabase();
    const users = await User.find();
    const user = users.find((u: UserType) => u.email === email);
    if (!user) {
      return NextResponse.json({ message: "User was not found" }, {status:404});
      
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ message: "Password does not match" },{status:401});
    }

    const loggedInUser = { isLoggedIn: true, ...user._doc } as UserType;
    const session = await sealData(loggedInUser, {password:process.env.SECRET_COOKIE_PASSWORD as string});
    
    //res.json(loggedInUser);
    const secure = process.env.NODE_ENV === 'production'?"; Secure":"";
    const headers = { 'Set-Cookie': `session=${session}; HttpOnly; ${secure}; Path=/`}
    return new Response(JSON.stringify({message:"logged in"}), {
      status: 200,
      headers
    });
  } catch (error) {
    console.log("there was an error", error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

