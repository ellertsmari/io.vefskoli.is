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
  const [users, setUsers] = useState<UserWithIdType[]>([]);
  const {user: loggedInUser, loading, error} = useLoggedInUser();
  
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`/api/users`);
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!loggedInUser) {
    return <div>You have to log in to see the content of this page</div>
  }

  return (
    <MainContent>
      <TitlePage>People</TitlePage>
      {users.map(user =>( 
        <Person 
          user={user} 
          isCurrentUser={user._id.toString() === loggedInUser._id.toString()} 
        />
      ))}
    </MainContent>
  );
};
 export default PeoplePage;