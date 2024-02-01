// import { NextRequest, NextResponse as res} from "next/server";
// /*import type { NextApiRequest, NextApiResponse as res } from "next";*/
// import { connectToDatabase } from "@/utils/mongoose-connector";
// import resources from "@/app/resources/page";
// import { Resources } from "@/models/resources";

// interface Success {
//   message: string;
// }

// // this is the same as in the route.ts from api/guides. Not sure if we need all this. 
// //WE might need it if we want to be able to create a resource manually?
// // export const POST = async (
// //     req: NextRequest
// //   ) => {
// //     console.log("POST /api/resources")
// //     // TODO: Add logic to create a resource
// //     await connectToDatabase();
// //     const body = await req.json();
// //     console.log("this is body",body)
// //     body.createdAt = new Date();
// //     body.updatedAt = new Date();
// //     const g = await Resources.create(body);
// //     console.log("this is g",g);
// //     return res.json({ message: "Resource created successfully", response:g }, { status: 200 });
// //   }
 
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
  
//   //Need to clear the route, aka file structure, for the resources in API. 
 

  

  