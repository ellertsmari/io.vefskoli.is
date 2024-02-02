// HALL OF FAME STUFF
// fetching the guides that are recommended to Hall of fame

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
      try {
        // Fetch data from the API
        const response = await fetch("/api/hallOfFame");
        console.log(response.status)
        // checking if the response was successful
        if (response.status === 200) {
          // Converting the response to JSON files
          const fameReview = await response.json();
          // Update the 'data' state variable with the parsed response
          setData(fameReview);
        } else {
          console.error('Guides not found')
        }
      // error handling if the response wasn't successful
      } catch (error) {
        console.error('Error loading guides:', error)
      }
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
                key={review.return.createdAt.toString()}
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