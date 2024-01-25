"use client";
import { MainContent } from "@/components/mainLayout";
import { GuidesContainer } from "@/components/guides/styles";
import FameCard from "@/components/fameCard/fameCard";
import { GuideType } from "@/models/guide";
import { ReturnType } from "@/models/return";
import { useState, useEffect } from "react";
// Define a TypeScript type 'Review' with properties 'guide' of type 'GuideType' and '_id' of type 'string'
type Review = {
  guide: GuideType;
  _id: string;
  "return": ReturnType;
};

// Define a React functional component named 'guides'
const guides = () => {
  // Use the useState hook to create a state variable 'data' and a function 'setData' to update it
  const [data, setData] = useState([]);

  // Use the useEffect hook to perform side effects in the component
  useEffect(() => {
    // Define an asynchronous function 'logFameGuides' to fetch data from the API
    async function logFameGuides() {
      // Fetch data from the API
      const response = await fetch("http://localhost:3000/api/hallOfFame");
      // Parse the response as JSON
      const fameReview = await response.json();
      // Update the 'data' state variable with the parsed response
      setData(fameReview);
      // Log the parsed response to the console
      console.log(fameReview);
      // review ID þarf að vera til í returns ID
    }
    // Call the 'logFameGuides' function
    logFameGuides();
  }, []); // An empty dependency array means this effect runs once on mount

  // Return the JSX to render
  return (
    <>
      <MainContent>
        <GuidesContainer>
          {/* Map over the 'data' array and render a 'FameCard' component for each item */}
          {data.map((review: Review) => {
            return (
              <FameCard
                // Use the guide's title as the key
                key={review.guide.title.toString()}
                // Pass the guide as a prop to the 'FameCard' component
                returnData={review.return}
                guide={review.guide}
              />
            );
          })}
        </GuidesContainer>
      </MainContent>
    </>
  );
};

// Export the 'guides' component as the default export
export default guides;