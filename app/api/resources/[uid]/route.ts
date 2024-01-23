import { NextRequest, NextResponse as res} from "next/server";
/*import type { NextApiRequest, NextApiResponse as res } from "next";*/
import { connectToDatabase } from "@/utils/mongoose-connector";
import { User, UserType } from "@/models/user";
import { cookies } from "next/headers";
import { unsealData, sealData} from "iron-session/edge";

interface Success {
  message: string;
}

export const GET = async (
    req: NextRequest,
  ) => {
    await connectToDatabase();
    const guides = await Resources.find({});
    if (guides === null) {
      return res.json({ message: "Guide not found" }, { status: 404 });
    }
     return res.json(guides, { status: 200 });
  }
  
  //get 