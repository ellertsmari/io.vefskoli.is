import { UserType } from "@/models/user";
import { unsealData} from "iron-session/edge";
import { NextResponse as res } from "next/server";
import { cookies } from "next/headers";

// taken from https://github.com/vvo/iron-session/issues/594

export const GET = async () => {
  console.log("loggedIn route");
  const cookieStore = cookies();
  if(!cookieStore.has("session")){
    return res.json({ message: "User not found", status: 500 });
  }
  const encryptedSession = cookieStore.get("session")?.value;
  const session = await unsealData<UserType>(encryptedSession as string, {password:process.env.SECRET_COOKIE_PASSWORD as string});
  if(session){
    return res.json(session);
  }
  else{
    return res.json({ message: "User not found", status: 500 });
  }
}