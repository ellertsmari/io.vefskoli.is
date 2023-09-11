import { NextRequest, NextResponse as res} from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Review, ReviewType } from "@/models/review";

export const GET = async (req: NextRequest) => {
  // ToDo: Get a single review by id
  return res.json({ message: "Hello world" });
}

export const PATCH = async (req: NextRequest) => {
  connectToDatabase();
  const vote = await req.json();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const review = await Review.findByIdAndUpdate(id, vote);

  return res.json(review);
}