import { UserType } from "@/models/user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/utils/session";
import { NextApiRequest, NextApiResponse } from "next";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = await req.body;

  try {
    const { data } = await fetch("../users").then((r) => r.json());

    const user = { isLoggedIn: true, ...data } as UserType;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
