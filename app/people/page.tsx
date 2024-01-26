// People page component
"use client";
import Person from "@/components/person/person"; // Adjust the import path as necessary
import { useEffect, useState } from "react";
import { UserWithIdType } from "@/models/user";

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
    <div>
      {users.map(user => <Person key={user} user={user} />)}
    </div>
  );
};

export default PeoplePage;