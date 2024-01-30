// HALL OF LAME STUFF

import { connectToDatabase } from "@/utils/mongoose-connector";
import { NextRequest, NextResponse } from "next/server";
import { Review } from "@/models/review";

export const GET = async (req: NextRequest) => {
    await connectToDatabase()
    const reviews = await Review.find({
        vote: 'no pass',
    })

    .populate('guide')
    .populate('return')

    if (reviews === null) {
        return NextResponse.json({message: 'Review not found'}, {status: 404})
    }

    return NextResponse.json(reviews, {status: 200})
}