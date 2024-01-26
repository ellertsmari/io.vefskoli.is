import React from 'react';
import { UserWithIdType } from '@/models/user';

type Props = {
    user: UserWithIdType; // Assuming this type has all the fields you're displaying
};

const Person = ({ user }: Props) => {
    // Directly use the 'user' prop to display user information
    return (
        <div>
            <h1>This is a person component</h1>
            <p>Name: {user.name}</p>
            <p>Background: {user.background}</p>
            <p>Career Goals: {user.careerGoals}</p>
            <p>Favorite Artists: {user.favoriteArtists}</p>
        </div>
    );
};

export default Person;
