//this is a hook that fetches the logged in user from /api/loggedIn
//I use this hook in /app/people to get the logged in user information
import { useState, useEffect } from "react";
import { UserWithIdType } from "@/models/user"; 

const useLoggedInUser = () => {
  const [user, setUser] = useState<UserWithIdType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch('/api/loggedIn');
        if (response.ok) {
          const userData: UserWithIdType = await response.json();
          setUser(userData);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch user data');
        }
      } catch (err) {
        setError('An error occurred while fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchLoggedInUser();
  }, []);

  return { user, loading, error };
};

export default useLoggedInUser;
