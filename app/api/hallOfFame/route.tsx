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
  // Start of the aggregation pipeline
  const reviews = await Review.aggregate([
    {
      // The $match stage filters the documents to pass only the documents that match the specified condition(s) to the next pipeline stage.
      $match: {
        vote: "recommend to Hall of fame", // Only pass the documents where the 'vote' field is 'recommend to Hall of fame'
      },
    },
    {
      // The $group stage groups the documents by some specified expression and outputs to the next stage a document for each distinct grouping.
      $group: {
        _id: "$return", // Group by the 'return' field
        count: { $sum: 1 }, // For each group, count the number of documents
        review: { $first: "$$ROOT" }, // For each group, take the first document that was encountered (in the order they were inputted)
      },
    },
    {
      // The $replaceRoot stage replaces the input document with the specified document.
      $replaceRoot: { newRoot: "$review" }, // Replace each input document with the document specified by the 'review' field
    },
  ]).exec(); // Execute the aggregation pipeline

  // Populate the 'reviews' documents with documents from other collections which are referenced in the 'reviews' documents
  const populatedReviews = await Review.populate(reviews, [
    { path: "guide" }, // Replace the 'guide' field in each 'reviews' document with the document from another collection referenced by the 'guide' field
    { path: "return" }, // Replace the 'return' field in each 'reviews' document with the document from another collection referenced by the 'return' field
  ]);

  // If no reviews are found (i.e., 'reviews' is null), return a JSON response with a message and a 404 status
  if (reviews === null) {
    return NextResponse.json({ message: "Review not found" }, { status: 404 });
  }

  // If reviews are found, return them as a JSON response with a 200 status
  return NextResponse.json(populatedReviews, { status: 200 });
};
