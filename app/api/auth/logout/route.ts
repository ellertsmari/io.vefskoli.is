import { sealData} from "iron-session/edge";
import { sessionOptions } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {


  try {
    const loggedInUser = { isLoggedIn: false };
    const session = await sealData(loggedInUser, {password:process.env.SECRET_COOKIE_PASSWORD as string});
    const headers = {'Set-Cookie': 'session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax'}
    return new Response(JSON.stringify({message:"logged out"}), {
      status: 200,
      headers
    });
  } catch (error) {
     return NextResponse.json({ message: error }, {status:500});
  }
}
