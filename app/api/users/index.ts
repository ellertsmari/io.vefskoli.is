import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { User, UserType } from "@/models/user";

interface Success {
  message: string;
}

/**
 * @swagger
 * /api/users:
 *   post:
 *     description: Creates a new user
 *     responses:
 *      200:
 *       description: User created successfully
 *      400:
 *       description: Bad request - Invalid user data
 *   get:
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: Successfully returned all users
 *       404:
 *         description: No users found
 */

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
      if (users === null) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(users);
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
