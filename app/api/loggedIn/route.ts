import { NextResponse as res } from "next/server";
import useServerUser from "@/utils/useServerUser";
import { UserType } from "@/models/user";

// taken from https://github.com/vvo/iron-session/issues/594

export const GET = async () => {
  const user = await useServerUser()
  if(user === "user not logged in"){
    return res.json({ message: user, status: 401 });
  }
  if(typeof user === "object"){
    return res.json(user);
  }
  else{
    return res.json({ message: user, status: 500 });
  }
}