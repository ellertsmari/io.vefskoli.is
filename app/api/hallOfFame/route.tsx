// HALL OF FAME STUFF
// using a GET request to fetch data from the database

import { NextResponse as res } from "next/server";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Review } from "@/models/review";
import "@/models/return";
import "@/models/guide";

// this is an asynchronous function named 'GET'
export const GET = async() => {
  // connect to the database
  await connectToDatabase();

  // Start of the aggregation pipeline
  const reviews = await Review.aggregate([
    {
      // The $match stage filters the documents to pass only the documents that match the specified condition(s) to the next pipeline stage.
      $match: {
        vote: {"$regex":"^recommend"} // Only pass the documents where the 'vote' field is 'recommend to Hall of fame'
      },
    },
    {
      // The $group stage groups the documents by some specified expression and outputs to the next stage a document for each distinct grouping.
      $group: {
        _id: "$return", // Group by the 'return' field
        count: { $sum: 1 }, // For each group, count the number of documents
        review: { $first: "$$ROOT" }, // create a new field called 'review' for each group, value assigned to this field is the entire original document (ROOT), specifically first document in the group
      },
    },
    {
      // The $replaceRoot stage replaces the input document with the specified document.
      $replaceRoot: { newRoot: "$review" }, // replace the root with the review (new document that replaced the original)
    },
    {
      $sort: {
        createdAt: 1 // ascending order by createdAt
      }
    }
  ]).exec(); // Execute the aggregation pipeline

  // Populate the 'reviews' documents with documents from other collections which are referenced in the 'reviews' documents
  const populatedReviews = await Review.populate(reviews, [
    { path: "guide" }, // Replace the 'guide' field in each 'reviews' document with the document from another collection referenced by the 'guide' field
    { path: "return" }, // Replace the 'return' field in each 'reviews' document with the document from another collection referenced by the 'return' field
  ]);

  // If no reviews are found (i.e., 'reviews' is null), return a JSON response with a message and a 404 status
  if (reviews === null || !reviews.length ) {
    return res.json({message: 'Guides not found'}, {status: 404});
  }

  // If reviews are found, return them as a JSON response with a 200 status
  return res.json(populatedReviews, {status: 200});
};