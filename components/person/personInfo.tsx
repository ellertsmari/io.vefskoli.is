import { useState } from "react";
import { FilledButton } from "../buttons";
import { Container, EmailFont, InfoFont, NameFont, PrimaryContainer, ProfilePicture, QuestionFont, SecondaryContainer, StyleDiv } from "./person-style";
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
                <StyleDiv><QuestionFont>Background:</QuestionFont> <InfoFont>{user.background}</InfoFont></StyleDiv>
                <StyleDiv><QuestionFont>Career Goals:</QuestionFont> <InfoFont>{user.careerGoals}</InfoFont></StyleDiv>
                <StyleDiv><QuestionFont>Interest:</QuestionFont> <InfoFont>{user.interests}</InfoFont></StyleDiv>
                {isCurrentUser && ( //if a user's dropdown is the same as the logged in user, a button shows to 'update profile'
                    <FilledButton onClick={onOpenUpdateProfile}>Update Profile</FilledButton>
                )}
            </SecondaryContainer>
        </Container>
    );
};

export default PersonInfo;