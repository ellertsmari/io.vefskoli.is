import React from 'react';
import { UserWithIdType } from '@/models/user';
import { Container, PrimaryContainer, SecondaryContainer, ProfilePicture, Button, EmailFont, NameFont, InfoFont, ArrowImage } from './person-style';
import Image from "next/image";
import dropdownArrow from "../../public/dropdownArrow.svg";

type Props = {
    user: UserWithIdType;
    isOpen: boolean;
    toggleDropdown: () => void;
};

const arrowAnimation = {
    closed: { rotate: 180 },
    open: { rotate: 0 },
};

const PersonInfo = ({ user }: { user: UserWithIdType }) => (
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

const PersonDropDown = ({ user, isOpen, toggleDropdown }: Props) => (
    <div>
        <Button isOpen={isOpen} onClick={toggleDropdown}>{user.name}
        <ArrowImage
              variants={arrowAnimation}
              initial={"closed"}
              animate={isOpen ? "open" : "closed"}
            >
                <Image alt="dropdownArrow" src={dropdownArrow}></Image>
        </ArrowImage>
        </Button>
        {isOpen && <PersonInfo user={user} />}
    </div>
);

export default PersonDropDown;
