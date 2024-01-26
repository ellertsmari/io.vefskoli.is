import { NextResponse as res } from "next/server";
import useServerUser from "@/utils/useServerUser";
import { OmitPassword } from "@/utils/types/types";

// taken from https://github.com/vvo/iron-session/issues/594

export const GET = async () => {
  const user : OmitPassword | string = await useServerUser()
  if(user === "user not logged in"){
    return res.json({ message: user, status: 401 });
  }
  if(typeof user === "object"){
    return res.json(user as OmitPassword);
  }
  else{
    return res.json({ message: user, status: 500 });
  }
}