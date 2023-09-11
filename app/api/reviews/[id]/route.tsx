import { NextRequest, NextResponse as res} from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Review, ReviewType } from "@/models/review";

export const GET = async (req: NextRequest) => {
  // ToDo: Get a single review by id
  return res.json({ message: "Hello world" });
}

export const PATCH = async (req: NextRequest) => {
  connectToDatabase();
  const grade = await req.json();
  const { searchParams } = new URL(req.url);
  
  console.log("grade: ",grade)
  const id = searchParams.get('id');
  console.log("id: ",id);
  const review = await Review.findByIdAndUpdate(id, grade);

  return res.json(review);
}