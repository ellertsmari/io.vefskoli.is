"use client";
//<------ Module 5 group project ------>
import React, { useEffect, useState } from 'react';
import { UserWithIdType } from '@/models/user';
import { MainContent } from '@/components/mainLayout';
import styled from 'styled-components';
import { ButtonContainer } from '@/components/person/person-style';
import PersonDropDown from '@/components/person/person';
import useLoggedInUser from "@/hooks/useLoggedInUser";
import JokePage from "@/components/person/Jokes/jokepage";

const TitlePage = styled.h1`
    font-style: Poppins;
    font-size: 32px;
`;

const PeoplePage = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [users, setUsers] = useState<UserWithIdType[]>([]); //UserWithIdType holds a schema for the user info as well as user_id
  const {user: loggedInUser, loading, error, refetch} = useLoggedInUser(); //user, loading and error is from the useLoggedInUser hook
  
  useEffect(() => {
    //fetching the users from /api/users that will display on the page
    const fetchUsers = async () => {
      const response = await fetch(`/api/users`);
      const data = await response.json();
      
      setUsers(data);
    };
    fetchUsers();
  }, []);

  //Function that can be passed down to child components and called with updated user data
  const updateUserInList = (updatedUser: UserWithIdType) => {
    setUsers(currentUsers => currentUsers.map(user => user._id === updatedUser._id ? updatedUser : user));
  };

  const toggleDropdown = (userId: string) => {
    setOpenDropdown((prevOpenDropdown) => (prevOpenDropdown === userId ? null : userId));
};
  //these are the states from 'useLoggedInUser' hook
  if (loading) {
    return <div>Loading...</div>; //maybe we could do a nicer loading thing
  }
  if (error) {
    return <div>Error: {error}</div>; //error message from the hook
  }
  if (!loggedInUser) {
    return <div>You have to log in to see the content of this page</div>
  }
// I cant put in the curlybr around People without typescript whining about it
  return (
    <MainContent>
      <TitlePage>People</TitlePage>
      <ButtonContainer>
      <JokePage/>
      {users.map((user) => 
        <PersonDropDown 
        key={user._id.toString()} 
        user={user}
        isOpen={openDropdown === user._id.toString()}
        toggleDropdown={() => toggleDropdown(user._id.toString())}
        isCurrentUser={user._id.toString() === loggedInUser._id.toString()} //comparing the logged in user to the users in the list, if it's the same user then he get's an 'update profile' option (see in Person component) 
        onUserDataUpdate={updateUserInList} //passing the function down to PersonDropDown
        refetch={refetch}
        />
        )}
      </ButtonContainer>
      
    </MainContent>
  
  );
};
 export default PeoplePage;