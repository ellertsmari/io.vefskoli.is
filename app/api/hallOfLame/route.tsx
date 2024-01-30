// HALL OF LAME STUFF

import { connectToDatabase } from "@/utils/mongoose-connector";
import { NextRequest, NextResponse } from "next/server";
import { Review } from "@/models/review";

//asynchronous GET function that fetches reviewed guides that didn't pass. 
//the GET function connects to the database, fetches and populates the required reviews, checks if reviews are found and returns the appropriate JSON response.
export const GET = async (req: NextRequest) => {
    await connectToDatabase()
    const reviews = await Review.find({
        vote: 'no pass',
    })
//for each review document fetched, related documents from guide and return collections will be included
    .populate('guide')
    .populate('return')


//error handling if no reviews are found
    if (reviews === null) {
        return NextResponse.json({message: 'Review not found'}, {status: 404})
    }
//if reviews are found the function returns them in a JSON response
    return NextResponse.json(reviews, {status: 200})
}