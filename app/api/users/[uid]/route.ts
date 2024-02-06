import { NextRequest, NextResponse as res} from "next/server";
/*import type { NextApiRequest, NextApiResponse as res } from "next";*/
import { connectToDatabase } from "@/utils/mongoose-connector";
import { User, UserType } from "@/models/user";
import { cookies } from "next/headers";
import { unsealData, sealData} from "iron-session/edge";
interface Success {
  message: string;
}

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     description: Returns a user by id
 *     responses:
 *       200:
 *         description: Successfully returned user
 *       404:
 *         description: No user with that id found
 *   put:
 *     description: Updates a user
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request - Invalid user data
 *       404:
 *         description: No user with that id found
 *   delete:
 *     description: Deletes a user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: No user with that id found
 */

/*
export default async function UserByIdHandler(
  req: NextApiRequest,
  res: NextApiResponse<UserType | Error | Success>
) {
  await connectToDatabase();

  const handler = {
    GET: async () => {
      await connectToDatabase();
      const user = await User.findOne({ _id: req.query.uid });
      if (user === null) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    },
    PUT: async () => {
      // TODO: Add logic to update the user
      res.status(200).json({ message: "User updated successfully" });
    },
    DELETE: async () => {
      // TODO: Add logic to "delete"(disable or add to trash? to prevent accidental deletion?) the user
      res.status(200).json({ message: "User deleted successfully" });
      return;
    },
    POST: async () => { //changes the user if you are a teacher so you can view students profiles
      const cookieStore = cookies();
      const encryptedSession = cookieStore.get("session")?.value;
      const session = await unsealData(encryptedSession as string, {password:process.env.SECRET_COOKIE_PASSWORD as string});
      if(session.role==="teacher"){
        console.log("teacher")
      }
      else{
        console.log("student")
      }
      console.log("the session role is: ",session.role)
      res.status(200).json({ message: "User updated successfully" });
    }
  };

  if (req.method == "GET") {
    await handler.GET();
  } else if (req.method == "PUT") {
    await handler.PUT();
  } else if (req.method == "DELETE") {
    await handler.DELETE();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }

  
}*/

export const POST = async ( req: NextRequest, { params }: { params: { uid: string } }) => { //changes the user if you are a teacher so you can view students profiles
  const cookieStore = cookies();
  const encryptedSession = cookieStore.get("session")?.value;
  const session = await unsealData(encryptedSession as string, {password:process.env.SECRET_COOKIE_PASSWORD as string});

  
  if(session.role==="teacher"){
    const newSession = await sealData({...session, _id:params.uid}, {password:process.env.SECRET_COOKIE_PASSWORD as string});
    const secure = process.env.NODE_ENV === 'production'?"; Secure":"";
    const headers = { 'Set-Cookie': `session=${newSession}; HttpOnly; ${secure}; Path=/`}
    return new Response(JSON.stringify({message:"logged in"}), {
      status: 200,
      headers
    });
  }
  else{
    return res.json({ message: "You don't have authority to access this page" }, { status: 200});
  }
  console.log("the session role is: ",session.role)
  return res.json({ message: "User updated successfully" }, { status: 200});
}
