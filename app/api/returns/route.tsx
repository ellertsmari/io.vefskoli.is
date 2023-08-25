import type { NextApiRequest, NextApiResponse } from "next";
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


export const POST = async (
  req: NextApiRequest,
  res: NextApiResponse<ReturnType[] | Error | Success>
) => {
  // TODO: Add logic to create a return
  connectToDatabase();
  Return.create(req.body);
  res.status(200).json({ message: "Return created successfully" });
}

export const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<ReturnType[] | Error | Success>
) => {
  const returns = await Return.find({});
  if (returns === null) {
    res.status(404).json({ message: "Return not found" });
    return;
  }
  res.status(200).json(returns);
  return;
}