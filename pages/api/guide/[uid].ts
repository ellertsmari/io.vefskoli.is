import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { User, type UserType } from "../../../models/user";
import { Guide } from "../../../models/guide";

interface Error {
  message: string;
}
interface Success {
  message: string;
}

export default async function guideByIDHandler(
  req: NextApiRequest,
  res: NextApiResponse<UserType | Error | Success>
) {
  await connectToDatabase();

  // TODO: check if user is admin for all but GET

  switch (req.method) {
    case "POST":
      // if usertype is not admin
      if (User.isAdmin !== true) {
        res.status(401).json({ message: "Unauthorized" });
        break;
      }
      // create a new guide
      await Guide.create(req.body);
      res.status(200).json({ message: "Guide created successfully" });
      break;

    case "GET":
      // get guide by id
      console.log(req.query);
      const guide = await Guide.findOne({ _id: req.query.uid });
      if (guide === null) {
        res.status(404).json({ message: "Guide not found" });
      } else {
        res.status(200).json(guide);
      }
      break;

    case "PUT":
      // update guide by id
      const guideToUpdate = await Guide.findOne({ _id: req.query.uid });
      if (guideToUpdate === null) {
        res.status(404).json({ message: "Guide not found" });
      } else {
        guideToUpdate.Catagory = req.body.Catagory;
        guideToUpdate.Title = req.body.Title;
        guideToUpdate.Description = req.body.Description;
        await guideToUpdate.save();
        res.status(200).json({ message: "Guide updated successfully" });
      }
      break;

    case "DELETE":
      // delete guide by id
      const guideToDelete = await Guide.findOne({ _id: req.query.uid });
      if (guideToDelete === null) {
        res.status(404).json({ message: "Guide not found" });
      } else {
        await guideToDelete.remove();
        res.status(200).json({ message: "Guide deleted successfully" });
      }
      break;

    default:
      // if the method is not GET, POST, PUT or DELETE
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
      break;
  }
}
