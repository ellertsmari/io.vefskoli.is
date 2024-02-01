"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { UserWithIdType } from '@/models/user';
import { MainContent } from '@/components/mainLayout';
import styled from 'styled-components';
import { ButtonContainer } from '@/components/person/person-style';
import PersonDropDown from '@/components/person/person';
import useLoggedInUser from "@/hooks/useLoggedInUser";

const TitlePage = styled.h1`
    font-style: Poppins;
    font-size: 32px;
`;

type Props = {
    user: UserWithIdType;
};

const PeoplePage = ({user}: Props) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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

  const toggleDropdown = (userId: string) => {
    setOpenDropdown((prevOpenDropdown) => (prevOpenDropdown === userId ? null : userId));
};
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
      <ButtonContainer>
      {users.map((user) => 
        <PersonDropDown 
        key={user._id.toString()} 
        user={user}
        isOpen={openDropdown === user._id.toString()}
        toggleDropdown={() => toggleDropdown(user._id.toString())}
        isCurrentUser={user._id.toString() === loggedInUser._id.toString()} //comparing the logged in user to the users in the list, if it's the same user then he get's an 'update profile' option (see in Person component) 
        />
        )}
      </ButtonContainer>
    </MainContent>
  );
};
 export default PeoplePage;