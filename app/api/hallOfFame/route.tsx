//HALL OF FAME STUFF

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Review } from "@/models/review";
import { Guide } from "@/models/guide";
import "@/models/return";
import "@/models/guide";

// This is an asynchronous function named 'GET' that takes a request object 'req' of type 'NextRequest'
export const GET = async (req: NextRequest) => {
  // Connect to the database
  await connectToDatabase();

  // Find all reviews in the 'Review' collection where the 'vote' field is "recommend to Hall of fame"
  // The 'populate("guide")' function is used to replace the 'guide' field in the 'Review' documents
  // with the actual 'guide' document from the 'Guide' collection
  const reviews = await Review.aggregate([
    {
      $match: {
        vote: 'recommend to Hall of fame',
      },
    },
    {
      $group: {
        _id: '$return',
        count: {$sum: 1},
        review: {$first: '$$ROOT'},
      },
    },
    {
      $replaceRoot: {newRoot: '$review'},
    },
  ]).exec()
  const populatedReviews = await Review.populate(reviews, [
    {path: 'guide'},
    {path: 'return'}
  ])

  //const guides = await Guide.populate(reviews, {path: 'guide'})

  // If no reviews are found (i.e., 'reviews' is null), return a JSON response with a message and a 404 status
  if (reviews === null) {
    return NextResponse.json({ message: "Review not found" }, { status: 404 });
  }

  // If reviews are found, return them as a JSON response with a 200 status
  return NextResponse.json(populatedReviews, { status: 200 });
};

/*export async function DELETE(request: Request) {
  await connectToDatabase()
  const body = await request.json()
  const id = new ObjectId(body.id)
  await Return.deleteOne({_id:id})
  return Response.json({message: 'Project successfully removed from Hall of fame.'})
}*/