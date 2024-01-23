import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Review, ReviewType } from "@/models/review";
import { Return } from "@/models/return";
import { ObjectId } from "mongodb";
import "@/models/return";
import "@/models/guide";

// This is an asynchronous function named 'GET' that takes a request object 'req' of type 'NextRequest'
export const GET = async (req: NextRequest) => {
  // Connect to the database
  await connectToDatabase();

  // Find all reviews in the 'Review' collection where the 'vote' field is "recommend to Hall of fame"
  // The 'populate("guide")' function is used to replace the 'guide' field in the 'Review' documents
  // with the actual 'guide' document from the 'Guide' collection
  const reviews = await Review.find({
    vote: "recommend to Hall of fame",
  })
    .populate("guide")
    .populate("return");

  // Log the 'reviews' to the console
  console.log(reviews);

  // If no reviews are found (i.e., 'reviews' is null), return a JSON response with a message and a 404 status
  if (reviews === null) {
    return NextResponse.json({ message: "Review not found" }, { status: 404 });
  }

  // If reviews are found, return them as a JSON response with a 200 status
  return NextResponse.json(reviews, { status: 200 });
};

export async function PUT(request: Request) {
  const client = await connectToDatabase()
  const body = await request.json()
  const id = new ObjectId(body.id)
  await Return.updateOne({_id:id}, { $set: body.returns})
  return Response.json({message: 'Project successfully updated.'})
}