import { NextRequest, NextResponse as res} from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Review, ReviewType } from "@/models/review";

export const GET = async (req: NextRequest) => {
  // ToDo: Get a single review by id
  return res.json({ message: "Hello world" });
}

export const PATCH = async (req: NextRequest, {params}:{params: {id:string}}) => {
  connectToDatabase();
  const grade = await req.json();
  const id = params.id;
  const review = await Review.findByIdAndUpdate(id, grade);
  return res.json(review);
}