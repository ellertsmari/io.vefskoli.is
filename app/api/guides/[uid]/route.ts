import { NextRequest, NextResponse as res} from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Guide, GuideType } from "@/models/guide";
import { ObjectId } from "mongodb";

interface Success {
  message: string;
}

/**
 * @swagger
 * /api/guides/{uid}:
 *   get:
 *     description: Returns a guide by id
 *     responses:
 *       200:
 *         description: Successfully returned guide
 *       404:
 *         description: No guide with that id found
 *   put:
 *     description: Updates a guide
 *     parameters:
 *      - name: testParam
 *        in: query
 *        description: This is a test parameter (required)
 *        required: true
 *      - name: testParam2
 *        in: query
 *        description: This is a test parameter 2 (optional)
 *        required: false
 *     responses:
 *       200:
 *         description: guide updated successfully
 *       400:
 *         description: Bad request - Invalid guide data
 *       404:
 *         description: No guide with that id found
 *   delete:
 *     description: Deletes a guide
 *     responses:
 *       200:
 *         description: guide deleted successfully
 *       404:
 *         description: No guide with that id found
 */


export const GET = async ( req: NextRequest, { params }: { params: { uid: string } }) => {
    const uid = new ObjectId(params.uid);
    await connectToDatabase();  
    console.log("this is uid",uid);
  const guide = await Guide.findOne({ _id: uid });
  if (guide === null) {
    return res.json({ message: "Guide not found" },{status:404});
    
  }
  return res.json(guide, { status: 200 });
}
export const PUT = async ( req: NextRequest) => {
  // TODO: Add logic to update the guide
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get('uid');
  await connectToDatabase();
  const guide = await Guide.findOneAndUpdate({id:uid}, req.json());
  res.json({ message: "Guide updated successfully" }, { status: 200 });
}
export const DELETE = async ( req: NextRequest) => {
  // TODO: Add logic to "delete"(disable or add to trash? to prevent accidental deletion?) the guide
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get('uid');
  await connectToDatabase();
  await Guide.deleteOne({ id: uid });
  res.json({ message: "Guide deleted successfully" }, { status: 200 });
  return;
}
