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
  Return.create(req.body);
  return res.json({ message: "Return created successfully" }, {status: 200});
}

export const GET = async (req: NextRequest,
) => {
  const returns = await Return.find({});
  if (returns === null) {
    res.json({ message: "Return not found" }, {status: 404});
    return;
  }
  res.json(returns, {status: 200});
  return;
}