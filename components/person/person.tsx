import React, { useState } from 'react';
import { UserWithIdType } from '@/models/user';
import { Container, PrimaryContainer, SecondaryContainer, ProfilePicture, Button, EmailFont, NameFont, InfoFont} from './person-style';

type Props = {
    user: UserWithIdType;
};

const PersonInfo = ({ user }: Props) => (
    <Container>
        <PrimaryContainer>
            <ProfilePicture className='default-profile-picture' src="/default-profile-picture.svg" alt="user-pic" />
            <NameFont>{user.name}</NameFont>
            <EmailFont>{user.email}</EmailFont>
        </PrimaryContainer>
        <SecondaryContainer>
            <EmailFont>Background:</EmailFont> <InfoFont>{user.background}</InfoFont>
            <EmailFont>Career Goals:</EmailFont> <InfoFont>{user.careerGoals}</InfoFont>
            <EmailFont>Interest:</EmailFont> <InfoFont>{user.interests}</InfoFont>
        </SecondaryContainer>
    </Container>
);

const PersonDropDown = ({ user }: Props) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <Button onClick={toggleDropdown}>{user.name}</Button>
            {isDropdownOpen && <PersonInfo user={user} />}
        </div>
    );
};

export default PersonDropDown;
