import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Review, ReviewType } from "@/models/review";
import { ObjectId } from "mongodb";

interface Success {
  message: string;
}

/**
 * @swagger
 * /api/reviews:
 *  post:
 *   description: Creates a new review
 *  responses:
 *  200:
 *  description: review created successfully
 * 400:
 * description: Bad request - Invalid review data
 * get:
 * description: Returns all reviews
 * responses:
 * 200:
 * description: Successfully returned all reviews
 * 404:
 * description: No reviews found
 * /api/reviews/{id}:
 * get:
 * description: Returns a review by id
 * responses:
 * 200:
 * description: Successfully returned a review
 * 404:
 * description: No review found
**/

export const POST = async (req: NextRequest) => {
  await connectToDatabase();
  const r = await req.json();
  console.log("r is: ",r);
  const result = await Review.create(r);
  console.log("result is: ",result);
  return NextResponse.json({ message: "Review created successfully", ...result }, {status: 200});
}

export const GET = async (req: NextRequest,
) => {
  await connectToDatabase();
  const reviews = await Review.find({});
  if (reviews === null) {
    return NextResponse.json({ message: "Review not found" }, {status: 404});
  }
  return NextResponse.json(reviews, {status: 200});
  
}

/*
export const GET_ID = async (req: NextRequest,
) => {
  const id = await req.json();
  const review = await Review.findById(id);
  if (review === null) {
    NextResponse.json({ message: "Review not found" }, {status: 404});
    return;
  }
  NextResponse.json(review, {status: 200});
  return;
}
*/
