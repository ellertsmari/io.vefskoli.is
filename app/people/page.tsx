// People page
"use client";
import Person from "@/components/person/person"; // Adjust the import path as necessary
import { ChangeEvent, useEffect, useState } from "react";
import { UserWithIdType } from "@/models/user";
import { MainContent } from "@/components/mainLayout";
import styled from 'styled-components'
import useLoggedInUser from "@/hooks/useLoggedInUser";

const TitlePage = styled.h1`
  font-style: Poppins;
  font-size: 32px;
`

const PeoplePage = () => {
  const [users, setUsers] = useState<UserWithIdType[]>([]); //UserWithIdType holds a schema for the user info as well as user_id
  const {user: loggedInUser, loading, error} = useLoggedInUser(); //user, loading and error is from the useLoggedInUser hook
  
  useEffect(() => {
    //fetching the users from /api/users that will display on the page
    const fetchUsers = async () => {
      const response = await fetch(`/api/users`);
      const data = await response.json();
      
      setUsers(data);
    };
    fetchUsers();
    //do we need error handling here?
  }, []);

  //these are the states from 'useLoggedInUser' hook
  if (loading) {
    return <div>Loading...</div>; //maybe we could do a nicer loading thing
  }
  if (error) {
    return <div>{error}</div>; //error message from the hook
  }
  if (!loggedInUser) {
    return <div>You have to log in to see the content of this page</div>
  }

  return (
    <MainContent>
      <TitlePage>People</TitlePage>
      {users.map(user =>(  // mapping users from the 'fetchUsers' function
        <Person //component
          user={user} 
          isCurrentUser={user._id.toString() === loggedInUser._id.toString()} //comparing the logged in user to the users in the list, if it's the same user then he get's an 'update profile' option (see in Person component)
        />
      ))}
    </MainContent>
  );
};
 export default PeoplePage;