//<------ Module 5 group project ------>
//this is a hook that fetches the logged in user from /api/loggedIn
//this hook is used in /app/people to get the logged in user information
import { useState, useEffect } from "react";
import { UserWithIdType } from "@/models/user"; 

const useLoggedInUser = () => {
  const [user, setUser] = useState<UserWithIdType | null>(null); //state to store the logged-in user's information, set to null.. since no user data is fetched yet
  const [loading, setLoading] = useState(true); // state to indicate if the request for fetching user data is in progress, set to true since we are indicating the loading is ongoing
  const [error, setError] = useState<string | null>(null); // state to store error messages if the request og fetching user data fails, set to null - no errors have occurred yet

  // useEffect hook to perform the api call as a side effect when the component mounts
  
    const fetchLoggedInUser = async () => { // async function to fetch the logged-in user's data
      try {
        const response = await fetch('/api/loggedIn'); // GET request to the api/loggedIn endpoint
        if (response.ok) { //chech if the response is successful
          const userData: UserWithIdType = await response.json(); //convert the information to a JSON format and update the user state
          setUser(userData);
        } else {
          const errorData = await response.json(); // if response is not successful show error message, update the error state
          setError(errorData.message || 'Failed to fetch user data');
        }
      } catch (err) { // if any network errors or other errors than from the GET request, show error message, update the error state
        setError('An error occurred while fetching user data');
      } finally {
        setLoading(false); // when the request is complete, successful or failed, update the loading state to false
      }
    };

    useEffect(() => { // useEffect to perform the initial fetch on component mount
    fetchLoggedInUser(); // call the fetchLoggedInUser function
  }, []); // the empty square brackets should ensure this effect only runs once after the component mounts

  const refetch = () => fetchLoggedInUser();

  return { user, loading, error, refetch }; // return the states to use in the component where we call the hook
};

export default useLoggedInUser;
