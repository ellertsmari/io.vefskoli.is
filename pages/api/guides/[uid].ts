import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide, GuideType } from "@/models/guide";

interface Success {
  message: string;
}

/**
 * @swagger
 * /api/guides/{uid}:
 *   get:
 *     description: Returns a guide by id
 *     responses:
 *       200:
 *         description: Successfully returned guide
 *       404:
 *         description: No guide with that id found
 *   put:
 *     description: Updates a guide
 *     parameters:
 *      - name: testParam
 *        in: query
 *        description: This is a test parameter (required)
 *        required: true
 *      - name: testParam2
 *        in: query
 *        description: This is a test parameter 2 (optional)
 *        required: false
 *     responses:
 *       200:
 *         description: guide updated successfully
 *       400:
 *         description: Bad request - Invalid guide data
 *       404:
 *         description: No guide with that id found
 *   delete:
 *     description: Deletes a guide
 *     responses:
 *       200:
 *         description: guide deleted successfully
 *       404:
 *         description: No guide with that id found
 */

export default async function guideByIdHandler(
  req: NextApiRequest,
  res: NextApiResponse<GuideType | Error | Success>
) {
  await connectToDatabase();

  const handler = {
    GET: async () => {
      const guide = await Guide.findOne({ id: req.query.uid });
      if (guide === null) {
        res.status(404).json({ message: "Guide not found" });
        return;
      }
      res.status(200).json(guide);
    },
    PUT: async () => {
      // TODO: Add logic to update the guide
      const guide = await Guide.findOneAndUpdate({id:req.query.uid}, req.body);
      res.status(200).json({ message: "Guide updated successfully" });
    },
    DELETE: async () => {
      // TODO: Add logic to "delete"(disable or add to trash? to prevent accidental deletion?) the guide
      await Guide.deleteOne({ id: req.query.uid });
      res.status(200).json({ message: "Guide deleted successfully" });
      return;
    },
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
}
