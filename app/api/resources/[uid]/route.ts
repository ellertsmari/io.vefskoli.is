import { NextRequest, NextResponse as res} from "next/server";
/*import type { NextApiRequest, NextApiResponse as res } from "next";*/
import { connectToDatabase } from "@/utils/mongoose-connector";
import resources from "@/app/resources/page";

interface Success {
  message: string;
}

export const GET = async (
    req: NextRequest,  // NextRequest is something we'll use to filter our resources f.ex. when we are in a specific guide
  ) => {
    await connectToDatabase();
    const rescources = await Resources.find({});
    if (resources === null) {
      return res.json({ message: "Resource not found" }, { status: 404 });
    }
     return res.json(resources, { status: 200 });
  }
  
  //Need to clear the route, aka file structure, for the resources in API. 
  //THe file in UID should be for the specific Module and Guide user has chosen. 
  //And the route.ts file this is written in should be under resources, not UID. git 