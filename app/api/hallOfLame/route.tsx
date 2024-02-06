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
  return res.json([{
    "_id": {
      "$oid": "6502e05caf3c7353d3ea666b"
    },
    "guide": {
      "_id": {
        "$oid": "5f12e46eb92a3e0782418196"
      },
      "title": "Did you really think it would be that easy to see who has failed?",
    },
    "return": {
      "_id": {
        "$oid": "6502df687dae7813ce6d1961"
      },
      "pictureUrl": "https://watcher.guru/news/wp-content/uploads/2022/04/1638805758-shutterstock-1452780077-800x450.jpg",
      "projectName": "Hacking failed",
      "comment": "You will need to try harder next time",
      "owner": {
        "$oid": "6502ddb8af3c7353d3ea665d"
      },
      "createdAt": {
        "$date": "2023-09-14T10:24:40.084Z"
      },
      "guide": {
        "$oid": "5f13205ab279dc27c467ca56"
      },
      "__v": 0,
      "reviewedAt": {
        "$date": "2023-09-20T22:18:44.107Z"
      }
    },
    "owner": {
      "$oid": "6502ddc47711900e44e430e5"
    },
    "comment": "Better luck next time",
    "vote": "pass",
    "createdAt": {
      "$date": "2023-09-14T10:28:44.460Z"
    },
    "__v": 0
}], { status: 200 });
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
