// import { NextRequest, NextResponse as res} from "next/server";
// /*import type { NextApiRequest, NextApiResponse as res } from "next";*/
// import { connectToDatabase } from "@/utils/mongoose-connector";
// import resources from "@/app/resources/page";
// import { Resources } from "@/models/resources";

// //This code is in the IUD folder of Resources
// //This code needs to be adjusted so it is picking the specifc module
// // files in UID are for the specific Module and Guide user has chosen. 
// interface Success {
//   message: string;
// }

// export const GET = async (
//     req: NextRequest,  // NextRequest is something we'll use to filter our resources f.ex. when we are in a specific guide
//   ) => {
//     await connectToDatabase();
//     const resources = await Resources.find({});
//     if (resources === null) {
//       return res.json({ message: "Resource not found" }, { status: 404 });
//     }
//      return res.json(resources, { status: 200 });
//   }
  
 