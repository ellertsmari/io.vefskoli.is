import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide } from "../../../models/guide";

export default async function guidesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  // TODO: check if user is admin for POST

  switch (req.method) {
    case "POST":
      // create a new guide
      const { Catagory, Title, Description } = req.body;
      const guide = new Guide({
        Catagory,
        Title,
        Description,
      });
      await guide.save();
      res.status(201).json(guide);
      break;
    case "GET":
      // get all guides
      const guides = await Guide.find({});
      res.status(200).json(guides);
      break;
    default:
      // if the method is not GET or POST
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
      break;
  }
}
