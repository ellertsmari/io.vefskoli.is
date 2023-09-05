import { cookies } from "next/headers";
import { UserWithIdType } from "@/models/user";
import { unsealData} from "iron-session/edge";



export default async function useServerUser() {
const cookieStore = cookies();
  if(!cookieStore.has("session")){
    return "user not logged in"
  }
  const encryptedSession = cookieStore.get("session")?.value;
  type OmitPassword = Omit<UserWithIdType, 'password'> & {password?:string};
  const session = await unsealData<OmitPassword>(encryptedSession as string, {password:process.env.SECRET_COOKIE_PASSWORD as string});
  delete session.password;
  if(session){
    return session;
  }
  else{
    return "User not found";
  }
}