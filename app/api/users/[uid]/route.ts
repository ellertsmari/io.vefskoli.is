//<------ Module 5 group project changes start in line 115 ------>
import { NextRequest, NextResponse as res} from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { User } from "@/models/user";
import { cookies } from "next/headers";
import { unsealData, sealData} from "iron-session/edge";
import { ObjectId } from "mongodb";

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

//<------ Module 5 group project ------>
// This function is an API route handler for updating user information in the database.
// in app/components/person/updateProfile/updateProfile.tsx is the fetch function
export const PUT = async (req: NextRequest, { params}: {params: {uid: string} }) => {
   
    await connectToDatabase(); // First, connect to the database 
    
    let body; //variable that will hold decoded JSON body
    const uid = params.uid; // extracting the user ID from the request parameters
    
    // Check if the request contains a body. If not, it's a bad request and we return a 400 status code
    if (!req.body){
      return new Response(JSON.stringify({ message: "Bad request - Invalid JSON" }), {status: 400});
    }
    try {
      // Try to parse the request body as JSON. This is where the client sends the data to update the user
      body = await req.json(); // Parsing the body of the request to JSON
    } catch (error) {
      // If parsing fails, return a 400 status code indicating a bad request due to invalid JSON
      return new Response(JSON.stringify({ message: "Bad request - Invalid JSON" }), {status: 400});
    }

    // Try to update the user information in the database using the UID and body
    try { // The findByIdAndUpdate method from Mongoose is used to update the user document in MongoDB. It's crucial to make sure the UID is correctly formatted as an ObjectId.
        const updatedUser = await User.findByIdAndUpdate(
            new ObjectId(uid), // Convert the string UID to an ObjectId for MongoDB
            body, // The data for the update
            { new: true, runValidators: true } // Options to return the updated document and run schema validators
        );

        // If no user is found with the provided UID, return a 404 status code
        if (!updatedUser) {
            return new Response(JSON.stringify({ message: "User not found" }), {status:404});
        }

        // If the user is successfully updated, return the updated user data with a 200 status code
        return new Response(JSON.stringify(updatedUser), {status:200});
    } catch (error) {
      // Log the error to the console and return a 500 status code for an internal server error
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {status:500});
    }
};