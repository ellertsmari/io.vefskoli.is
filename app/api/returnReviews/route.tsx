import { Return } from "@/models/return"
import { NextRequest, NextResponse as res } from "next/server"
import { connectToDatabase } from "@/utils/mongoose-connector"
import { Review } from "@/models/review"

//GET function to get all the data to be able to change a vote
/*export const GET = async (req: NextRequest) => {
    await connectToDatabase()
    const reviews = await Review.find({})
    if (reviews === null) {
        res.json({ message: 'Return not found' }, {status: 404})
        return;
    }
    res.json(reviews, {status: 200})
    return console.log(reviews)
}*/