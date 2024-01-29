//HALL OF LAME STUFF

'use client'

import FameCard from "@/components/fameCard/fameCard";
import { GuidesContainer } from "@/components/guides/styles";
import { MainContent } from "@/components/mainLayout";
import { GuideType } from "@/models/guide";
import { ReturnType } from "@/models/return";
import { useEffect, useState } from "react";

// Define a TypeScript type 'Review' with properties 'guide' of type 'GuideType' and '_id' of type 'string'
type Review = {
  guide: GuideType;
  _id: string;
  'return': ReturnType;
}

//Making a Hall of lame component
const hallOfLame = () => {
//Use the useState hook to create a state variable 'data' and a function 'setData' to update it
  const [data, setData] = useState([])
//Use the useEffect hook to perform side effects in the component
  useEffect(() => {
//Asynchronous function to fetch data from the API
    async function logLameGuides() {
//Fetching the data from the API
      const response = await fetch('/api/hallOfLame')
//Converting the response into JSON files
      const lameReview = await response.json()
//Update the 'data' state variable with the parsed response
      setData(lameReview)
//Logging the response into the console
      console.log(lameReview)
    }

    logLameGuides()
  }, [])

  return (
    <>
      <MainContent>
        <GuidesContainer>
           {/* Mapping over the 'data' array and render a 'FameCard' component for each item */}
          {data.map((review: Review) => {
            return (
              <FameCard
              // Use the guide's title as the key
                key={review.guide.title.toString()}
               // Pass the guide as a prop to the 'FameCard' component
                returnData={review.return}
                guide={review.guide}
              />
            )
          })}
        </GuidesContainer>
      </MainContent>
    </>
  )
};

export default hallOfLame;
