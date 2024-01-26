"use client";
import { connectToDatabase } from '@/utils/mongoose-connector';
import { UserWithIdType, UserType } from '@/models/user';
import React, { useEffect, useState } from 'react';

type Props = {
    user: UserWithIdType
  };

 const getPerson = async ({ user }:Props ): Promise<UserType[] | null> => {
    await connectToDatabase();
    const student = user;
    try {
      const users = await await fetch(
        `/api/users/${student._id}`,
        {
          method: 'PATCH',

        }
      ); // Assuming User is the model for user data
      if (Array.isArray(users) /* && users.every(user => checkIfUserType(user)) */) {
        return users;
    } else {
        // Handle unexpected 'users' value (e.g., error messages) here
        console.error('Unexpected response:', users);
        return null;
    }
    } catch (error) {
      console.error('Error fetching users:', error);
      return null;
    }
  };

  const Person = ({user}: Props) => {
    const [users, setUsers] = useState<UserType[] | null>(null);
    const student = user;

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getPerson({user}); 
            setUsers(fetchedUsers);
        };
        fetchUsers();
    }, []); // Empty dependency array means this effect runs once on mount

    if (!users) {
        return <>Loading...</>;
    }


    return (
        <div>
            <h1>this is a person</h1>
            <h1>{student?.name}</h1>
            <h1>{student?.background}</h1>
            <h1>{student?.careerGoals}</h1>
            <h1>{student?.favoriteArtists}</h1>
        </div>
    )

};
export default Person;