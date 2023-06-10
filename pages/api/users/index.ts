import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { User, UserType } from "../../../models/user";

interface Success {
  message: string;
}

export default async function usersHandler(
  req: NextApiRequest,
  res: NextApiResponse<UserType[] | Error | Success>
) {
  await connectToDatabase();

  const handler = {
    POST: async () => {
      // TODO: Add logic to create a user
      res.status(200).json({ message: "User created successfully" });
    },

    GET: async () => {
      const users = await User.find();
      res.status(200).json(users);
      // if (users === null) {
      //   res.status(404).json({ message: "User not found" });
      //   return;
      // }
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
