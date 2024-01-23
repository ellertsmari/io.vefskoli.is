import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Review, ReviewType } from "@/models/review";

export const GET = async (req: NextRequest) => {
  await connectToDatabase();
  const reviews = await Review.find({
    vote: "recommend to Hall of fame",
  }).populate("guide");
  console.log(reviews);
  if (reviews === null) {
    return NextResponse.json({ message: "Review not found" }, { status: 404 });
  }
  return NextResponse.json(reviews, { status: 200 });
};
