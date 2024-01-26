// People page
"use client";
import Person from "@/components/person/person"; // Adjust the import path as necessary
import { useEffect, useState } from "react";
import { UserWithIdType } from "@/models/user";
import { MainContent } from "@/components/mainLayout";
import styled from 'styled-components'

const TitlePage = styled.h1`
  font-style: Poppins;
  font-size: 32px;
`

type Props = {
    user: UserWithIdType;
  };

const PeoplePage = ({user}: Props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <MainContent>
      <TitlePage>People</TitlePage>
      {users.map(user => <Person key={user} user={user} />)}
    </MainContent>
  );
};

export default PeoplePage;