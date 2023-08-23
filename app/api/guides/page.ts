import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide, GuideType } from "@/models/guide";

interface Success {
  message: string;
}

/**
 * @swagger
 * /api/guides:
 *   post:
 *     description: Creates a new guide
 *     responses:
 *      200:
 *       description: guide created successfully
 *      400:
 *       description: Bad request - Invalid guide data
 *   get:
 *     description: Returns all guides
 *     responses:
 *       200:
 *         description: Successfully returned all guides
 *       404:
 *         description: No guides found
 */

export default async function guidesHandler(
  req: NextApiRequest,
  res: NextApiResponse<GuideType[] | Error | Success>
) {
  await connectToDatabase();

  const handler = {
    POST: async () => {
      // TODO: Add logic to create a guide
      Guide.create(req.body);
      res.status(200).json({ message: "Guide created successfully" });
    },

    GET: async () => {
      const guides = await Guide.find({});
      if (guides === null) {
        res.status(404).json({ message: "Guide not found" });
        return;
      }
      res.status(200).json(guides);
      return;
    },
  };

  if (req.method == "POST") {
    await handler.POST();
  } else if (req.method == "GET") {
    await handler.GET();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
