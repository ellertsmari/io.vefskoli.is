//HALL OF LAME STUFF
// same purpose as the route for Hall of Fame but with the vote 'no pass'

// Import the function to connect to the database
import { connectToDatabase } from "@/utils/mongoose-connector";
// Import the type for the response object from Next.js
import { NextResponse as res } from "next/server";
// Import the Review model
import { Review } from "@/models/review";

// Define the GET method for this endpoint
export const GET = async () => {
  // Connect to the database
  await connectToDatabase();
  // Find all reviews in the 'Review' collection where the 'vote' field is 'no pass'
  const reviews = await Review.find({
    vote: "no pass",
  })
    // Populate the 'guide' and 'return' fields in the found reviews with the documents from other collections referenced by these fields
    .populate("guide")
    .populate("return");

  // If no reviews were found, return a 404 status code and a message
  if (reviews === null) {
    return res.json({message: "Review not found" }, { status: 404});
  }

  // If reviews were found, return a 200 status code and the reviews
  return res.json(reviews, { status: 200 });
};
