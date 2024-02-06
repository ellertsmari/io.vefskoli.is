// HALL OF FAME STUFF IN THIS FILE
// function to edit information of guides in Hall of Fame

import { NextRequest, NextResponse as res } from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Return } from "@/models/return";
import useServerUser from "@/utils/useServerUser";
import { ObjectId } from "mongodb";
interface Success {
  message: string;
}

/**
 * @swagger
 * /api/returns:
 *   post:
 *     description: Creates a new return
 *     responses:
 *      200:
 *       description: return created successfully
 *      400:
 *       description: Bad request - Invalid return data
 *   get:
 *     description: Returns all returns
 *     responses:
 *       200:
 *         description: Successfully returned all returns
 *       404:
 *         description: No returns found
 */

export const POST = async (req: NextRequest) => {
  // TODO: Add logic to create a return
  connectToDatabase();
  const r = await req.json();
  const result = await Return.create(r);
  console.log("result is: ",result);
  return res.json({ message: "Return created successfully", ...result }, {status: 200});
}

export const GET = async () => {
  await connectToDatabase();
  const returns = await Return.find({});
  if (returns === null) {
    res.json({ message: "Return not found" }, {status: 404});
    return;
  }
  res.json(returns, {status: 200});
  return;
}

// HALL OF FAME STUFF
// defining an asynchronous function for handling HTTP PUT requests
export const PUT = async (req: NextRequest) => {
  // connecting to the database
  await connectToDatabase()
  // parsing the JSON body of the request (dividing into readable/understandable chunks)
  const body = await req.json()
  // find and update the document in the 'Return' collection based on the provided ID
  const user = await useServerUser();
  if (!user || typeof user === "string") {
    return res.json({message:"You are not authorized to update this review"});
  }
  const your = await Return.find({owner: new ObjectId(user._id)});
  if (!your || your.length === 0) {
    return res.json({message:"You are not authorized to update this review"});
  }
  const updatedReturn = await Return.findOneAndUpdate(
    {_id: body.id},
    {
      $set: {
        projectName: body.projectName,
        pictureUrl: body.pictureUrl,
      }
    },
    // return the updated document
    {new: true}
  )

  // if the document isn't found, respond with a 404 status and a JSON message
  if (!updatedReturn) {
    return res.json({message: 'Return not found'}, {status: 404})
  }
  console.log(updatedReturn);
  // respond with the updated document in JSON format
  return res.json(updatedReturn)

}