// People page component
"use client";
import Person from "@/components/person/person"; // Adjust the import path as necessary
import { ChangeEvent, useEffect, useState } from "react";
import { UserWithIdType } from "@/models/user";

type Props = {
    user: UserWithIdType;
  };

const PeoplePage = ({user}: Props) => {
  const [users, setUsers] = useState([]);
  const student = user;

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  // to be able to update your own profile in the dropdown - 
  // we will have to figure out how to make the own users dropdown
  // be different to others (have an "update" button)
  const updateProfile = async (e:ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const res = await fetch( // not sure if const res works
      `/api/users/${student._id}`,
      {
        method: 'PATCH',
        body: data,
      }
    );
  }

  return (
    <div>
      {users.map(user => <Person key={user} user={user} />)}
    </div>
  );
};

export default PeoplePage;