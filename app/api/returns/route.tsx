import { NextRequest, NextResponse as res } from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Return, ReturnType } from "@/models/return";
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

export const GET = async (req: NextRequest,
) => {
  await connectToDatabase();
  const returns = await Return.find({});
  if (returns === null) {
    res.json({ message: "Return not found" }, {status: 404});
    return;
  }
  res.json(returns, {status: 200});
  return;
}

//Asynchronous function named "PUT" 
/*export async function PUT(request: Request) {
  await connectToDatabase()
  const body = await request.json()
  const id = body.id;
  const object = new ObjectId(id);
  console.log(object)
  delete body.id
  await Return.updateOne({_id:object}, { $set: body})
  return Response.json({message: 'Project information successfully updated.'})
    // Handle error (e.g., send an error response)
}*/