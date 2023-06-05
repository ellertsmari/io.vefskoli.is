import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide, type GuideType } from "@/models/guide";

interface Error {
  message: string;
}
interface Success {
  //only for the post call
  message: string;
}

// get guide by id
async function handleGetRequest(
  req: NextApiRequest,
  res: NextApiResponse<Success | Error | GuideType>
) {
  console.log("req.query.uid", req.query.uid);

  const guide = await Guide.findOne({ id: req.query.uid });
  if (guide === null) {
    res.status(404).json({ message: "Guide not found" });
    return;
  }
  res.status(200).json(guide);
}

// Update guide by id
async function handlePutRequest(
  req: NextApiRequest,
  res: NextApiResponse<Success | Error>
) {
  // Check user type and authorization if needed
  // if (User.isAdmin !== true) {
  //   res.status(401).json({ message: "Unauthorized" });
  //   return;
  // }

  try {
    const guideToUpdate = await Guide.findOne({ id: req.query.uid });

    if (!guideToUpdate) {
      res.status(404).json({ message: "Guide not found" });
    } else {
      const guideData: Partial<GuideType> = req.body;
      Object.assign(guideToUpdate, guideData);

      const updatedGuide = await guideToUpdate.save();

      res.status(200).json(updatedGuide);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating the guide" });
  }
}

// delete guide by id
async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  // if usertype is not admin
  // if (User.isAdmin !== true) {
  //   res.status(401).json({ message: "Unauthorized" });
  //   return;
  // }

  const guideToDelete = await Guide.findOne({ id: req.query.uid });
  if (guideToDelete === null) {
    res.status(404).json({ message: "Guide not found" });
    return;
  }
  await Guide.deleteOne({ _id: req.query.uid });
  res.status(200).json({ message: "Guide deleted successfully" });
  return;
}

export default async function guidesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      // if the method is not GET, PUT or DELETE
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
      break;
  }
}
