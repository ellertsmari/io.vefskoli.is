// HALL OF FAME STUFF IN THIS DOCUMENT
// function to remove guides from Hall of Fame

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
  console.log("r is: ", r);
  const result = await Review.create(r);
  console.log("result is: ", result);
  return NextResponse.json(
    { message: "Review created successfully", ...result },
    { status: 200 }
  );
};

export const GET = async (req: NextRequest) => {
  await connectToDatabase();
  const reviews = await Review.find({});
  if (reviews === null) {
    return NextResponse.json({ message: "Review not found" }, { status: 404 });
  }
  return NextResponse.json(reviews, { status: 200 });
};

// HALL OF FAME STUFF
// PUT function finding the object with return id and vote as hall of fame to change the vote (called in removeCard)
// Define the PUT method for this endpoint
export async function PUT(req: NextRequest) {
  // Connect to the database
  await connectToDatabase();
  // Parse the JSON body of the request
  const body = await req.json();
  // Create a new ObjectId with the body id
  const object = new ObjectId(body.id);
  // Update many documents in the 'Review' collection where the 'return' field is the ObjectId and the 'vote' field is 'recommend to Hall of fame', setting the 'vote' field to the 'vote' field in the body
  await Review.updateMany(
    { return: object, vote: "recommend to Hall of fame" },
    { $set: { vote: body.vote } }
  );

  // if no guide found, return a 404 status code and a message
  if (object === null) {
    return NextResponse.json({message: 'Guide not found'}, {status: 404})
  }
  
  // Return a 200 status code and a message
  return Response.json(
    { message: "Project successfully removed from Hall of fame." },
    { status: 200 }
  );
}