import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide } from "@/models/guide";

export default async function guidesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
    const guides = await Guide.find({});
    if (guides === null) {
      res.status(404).json({ message: "Guide not found" });
      return;
    }
    res.status(200).json(guides);
  }

  async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
    // if usertype is not admin
    // if (User.isAdmin !== true) {
    //   res.status(401).json({ message: "Unauthorized" });
    //   return;
    // }

    try {
      const guide = new Guide(req.body);
      const validationError = guide.validateSync();

      if (validationError) {
        const missingFields = Object.keys(validationError.errors).join(", ");
        res.status(400).json({ message: `Missing fields: ${missingFields}` });
      } else {
        await guide.save();
        res.status(201).json(guide);
      }
    } catch (error) {
      res.status(500).json({ message: "Error saving the guide" });
    }
  }

  // TODO: check if user is admin for POST

  switch (req.method) {
    case "POST":
      // create a new guide
      await handlePostRequest(req, res);
      break;
    case "GET":
      // get all guides
      await handleGetRequest(req, res);
      break;
    default:
      // if the method is not GET or POST
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
      break;
  }
}
