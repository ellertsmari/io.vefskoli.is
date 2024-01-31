import { useState } from "react";
import { FilledButton } from "../buttons";
import { Container, EmailFont, InfoFont, NameFont, PrimaryContainer, ProfilePicture, SecondaryContainer } from "./person-style";
import { UserWithIdType } from "@/models/user";

type Props = {
    user: UserWithIdType;
    isCurrentUser: boolean; // I'm adding this prop to be able to update profile for the user that is logged in
};

const PersonInfo = ({ user, isCurrentUser, onOpenUpdateProfile }: Props & { onOpenUpdateProfile: () => void }) => {
    
    return (
        <Container>
            <PrimaryContainer>
                <ProfilePicture className='default-profile-picture' src={user.avatarUrl || '/default-profile-picture.svg'} alt="user-pic" />
                <NameFont>{user.name}</NameFont>
                <EmailFont>{user.email}</EmailFont>
            </PrimaryContainer>
            <SecondaryContainer>
                <EmailFont>Background:</EmailFont> <InfoFont>{user.background}</InfoFont>
                <EmailFont>Career Goals:</EmailFont> <InfoFont>{user.careerGoals}</InfoFont>
                <EmailFont>Interest:</EmailFont> <InfoFont>{user.interests}</InfoFont>
                {isCurrentUser && ( //if a user's dropdown is the same as the logged in user, a button shows to 'update profile'
                    <FilledButton onClick={onOpenUpdateProfile}>Update Profile</FilledButton>
                )}
            </SecondaryContainer>
        </Container>
    );
};

export default PersonInfo;