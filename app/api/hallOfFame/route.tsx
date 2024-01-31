// HALL OF FAME STUFF

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Review } from "@/models/review";
import { Guide } from "@/models/guide";
import "@/models/return";
import "@/models/guide";

// this is an asynchronous function named 'GET' that takes a request object 'req' of type 'NextRequest'
export const GET = async (req: NextRequest) => {
  // connect to the database
  await connectToDatabase();

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
    {
      $sort: {
        createdAt: 1   // ascending order by createdAt
      }
    },
  ]).exec()
  const populatedReviews = await Review.populate(reviews, [
    {path: 'guide'},
    {path: 'return'}
  ])

  // If no reviews are found (i.e., 'reviews' is null), return a JSON response with a message and a 404 status
  if (reviews === null) {
    return NextResponse.json({ message: "Review not found" }, { status: 404 });
  }

  // If reviews are found, return them as a JSON response with a 200 status
  return NextResponse.json(populatedReviews, { status: 200 });
};