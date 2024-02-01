import { NextResponse } from "next/server";

let token = ""  //defining our token variable. Initalizing it first as an empty string. We'll get the auth token when we make our requests to the ZOOM API

// creating a custom error object with a code property to handle specific error cases
interface ErrorCode extends Error {
  code?: number;
}

// getVideos fetches video data from the Zoom API and it takes token as a parameter for authentication. 
const getVideos= async(token:string)=>{
  let data:{}[] = []   // Initializing an empty array of ojects that will hold the fetched video data. 
  const months:number[] = [7,8,9,10,11,0,1,2,3,4];  // This represents the months for which the function will fetch the data. School year months. 
   
  /*For Loop to iterate over each month in the array. It allows the code to be executed repeatedly.   
  Declare our loop counter as 0. Runs until it's no longer true, or less than the length of the months array. 
  This ensures that the loop runs once for each element in the months array. i++ adds one month by each iteration*/
  for (let i = 0; i < months.length; i++) {  
    
    const fromDate = new Date();   //our start date from fetching videos.
    const isSpring = fromDate.getMonth() < 7  //Asking what month it is right now and if it is true (less than 7) it is spring.
    const isFetchingFromSpring = months[i]< 7  //If the month we picked is less than 7 it's true and it is indeed spring: tells us if the videos we’re fetching are from a spring term.
   
    fromDate.setFullYear(fromDate.getFullYear() - (Number(isSpring) - Number(isFetchingFromSpring)));  //This adjust our data according to when we are fetching it.

    fromDate.setMonth(months[i]); // sets our month in the fromDate to the first element in the array (7)
    fromDate.setDate(1); // setting the day of the fromDate object to the first of each month. 
    fromDate.setHours(0, 0, 0, 0); // set to midnight each day

    const toDate = new Date(fromDate); //creates a new Date object with the end date for fetching videos.
    toDate.setMonth(months[i] + 1); //Sets the month to a month before the start date. This ensures you get videos from the start of the month.
  
    //The URL is constructed for the API request and the template literals add in the parameters from what is defined above. Changes the strings to ISO and T splits it into time. 
    const url = `https://api.zoom.us/v2/users/vefskolinn@tskoli.is/recordings?page_size=30&from=${fromDate.toISOString().split('T')[0]}&to=${toDate.toISOString().split('T')[0]}`

    try {     
        const response = await fetch (url,{
            headers: {
                authorization: "Bearer "+ token     //sending a request to the Zoom API with the constructed URL and the provided token.
            }
        });

      if (response == null) throw new Error("Response is null.");
      if (response.status == 404) throw new Error("Page not found.")
      if (response.status == 401) { 
        const error: ErrorCode = new Error("My invalid access token.")
        error.code = 124;
        throw error 
      }
      
      const json = await response.json()
      data = [...data, ...json.meetings]   // This adds the fetched meetings to the data array.
      
    } catch (error) {      //This block catches any errors that occur during the fetch operation, logs them, and returns an object containing the error and the fetched data.
      const errorObject:{} = await error as object; 
        return {...errorObject, meetings:data,}; 
      }
  };
return {error:{},meetings:data, code:200}   //returning an object containing the fetched data and a status code of 200, indicating success.
};

// a GET function that is used to export from the module. 
// This function calls the getVideos, handles the response, refreshes the tokens when and if necessary and then returns the final response
export const GET= async ()=> {

  try { 
    // This checks if the returned code is 124, indicating an invalid access token.
    let data = await getVideos(token)
    if (data.code===124){
      if (!process.env.BASIC_AUTH )  // This checks if the BASIC_AUTH environment variable is set.
      return NextResponse.json({error:'You need the BASIC_AUTH in your .env.local file for this!'})   // If not, it returns an error.

      const tokenResponse = await fetch ("https://zoom.us/oauth/token?grant_type=account_credentials&account_id=xTmwVbNdQRGv5XBIuyvI2A",{
          method: "POST",
          cache:"no-cache",
          headers:{
            authorization: process.env.BASIC_AUTH 
          }
      })  

      const tokenData = await tokenResponse.json()   // This fetches a new access token.
      token = tokenData.access_token
      data = await getVideos(token)
    }
    
    if (token == null) throw new Error("Missing tokendata.")
    return NextResponse.json(data);  //returns fetched data as json
    } catch (error) {
      return NextResponse.json(error);  
    }
  };
