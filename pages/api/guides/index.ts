import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide, GuideType } from "@/models/guide";

interface Success {
  message: string;
}

export default async function guidesHandler(
  req: NextApiRequest,
  res: NextApiResponse<GuideType[] | Error | Success>
) {
  await connectToDatabase();

  const handler = {
    POST: async () => {
      // TODO: Add logic to create a guide
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
