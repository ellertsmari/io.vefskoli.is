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

//Asynchronous function named "PUT" 
export async function PUT(request: Request) {
  await connectToDatabase()
  const body = await request.json()
  const id = body.id;
  if (!id || id.length !== 24 || !id.match(/^[0-9a-fA-F]{24}$/)) {
    console.log(id)  }
  const object = new ObjectId(id);
  console.log(object)
  await Return.updateOne({_id:object}, { $set: {projectName:body.projectName, pictureUrl:body.pictureUrl}})
  
  return Response.json({message: 'Project information successfully updated.'})


    // Handle error (e.g., send an error response)
}



export async function DELETE(request: Request) {
  await connectToDatabase()
  const body = await request.json()
  const id = new ObjectId(body.id)
  await Return.deleteOne({_id:id})
  return Response.json({message: 'Project successfully removed from Hall of fame.'})
}