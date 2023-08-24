import { UserType } from "@/models/user";
import bcrypt from "bcrypt";
import { getIronSession} from "iron-session/edge";
import { sessionOptions } from "@/utils/session";
import { NextApiRequest, NextApiResponse } from "next";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = await req.body;

  try {
    const { users } = await fetch("../users").then((r) => r.json());
    const user = users.find((u: UserType) => u.email === email);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: "Password does not match" });
      return;
    }

    const loggedInUser = { isLoggedIn: true, ...user } as UserType;
    const session = await getIronSession(req, res, sessionOptions);
    session.user = loggedInUser;
    await session.save();
    //res.json(loggedInUser);
    res.redirect("/guides");
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

