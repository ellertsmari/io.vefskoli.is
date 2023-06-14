import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { User, UserType } from "@/models/user";

interface Success {
  message: string;
}

export default async function UserByIdHandler(
  req: NextApiRequest,
  res: NextApiResponse<UserType | Error | Success>
) {
  await connectToDatabase();

  const handler = {
    GET: async () => {
      const user = await User.findOne({ _id: req.query.uid });
      if (user === null) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    },
    PUT: async () => {
      // TODO: Add logic to update the user
      res.status(200).json({ message: "User updated successfully" });
    },
    DELETE: async () => {
      // TODO: Add logic to "delete"(disable or add to trash? to prevent accidental deletion?) the user
      res.status(200).json({ message: "User deleted successfully" });
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
