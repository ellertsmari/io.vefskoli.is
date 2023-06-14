import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide, GuideType } from "@/models/guide";

interface Success {
  message: string;
}

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
      res.status(200).json({ message: "Guide updated successfully" });
    },
    DELETE: async () => {
      // TODO: Add logic to "delete"(disable or add to trash? to prevent accidental deletion?) the guide
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
