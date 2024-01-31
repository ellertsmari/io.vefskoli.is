import React, { ChangeEvent, useState } from 'react';
import { UserWithIdType } from '@/models/user';
import { Container, PrimaryContainer, SecondaryContainer, ProfilePicture, Button, EmailFont, NameFont, InfoFont, StyleDiv, QuestionFont} from './person-style';
import UpdateUserProfile from './updateProfile/updateProfile';
import { DropdownButton } from '../dropDown/styles';
import { FilledButton } from '../buttons';

type Props = {
    user: UserWithIdType;
    isCurrentUser: boolean; // I'm adding this prop to be able to update profile for the user that is logged in
};

const PersonInfo = ({ user }: Props) => (
    <Container>
        <PrimaryContainer>
            <ProfilePicture className='default-profile-picture' src={user.avatarUrl} alt="user-pic" />
            <NameFont>{user.name}</NameFont>
            <EmailFont>{user.email}</EmailFont>
        </PrimaryContainer>
        <SecondaryContainer>
          
            <StyleDiv><QuestionFont>Background:</QuestionFont> <InfoFont>{user.background}</InfoFont></StyleDiv>
            <StyleDiv><QuestionFont>Career Goals:</QuestionFont> <InfoFont>{user.careerGoals}</InfoFont></StyleDiv>
            <StyleDiv><QuestionFont>Interest:</QuestionFont> <InfoFont>{user.interests}</InfoFont></StyleDiv>
        </SecondaryContainer>
    </Container>
);

const PersonDropDown = ({ user, isCurrentUser }: Props) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false); // state for the dropdown
    const [isOpen, setIsOpen] = useState(false); // this state is for the update profile window
    const student = user;

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const openUpdateProfile = () => {
      setIsOpen(!isOpen);
    }

    //Bjork figuring out how to update profile
    

    //this is to upload a profile picture
    const handleUpload = async (e:ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const data = new FormData();
      const files = e.target.files as FileList;
      data.append('file', files[0]);
      data.append('upload_preset', 'profile-pictures');
      //const res = await fetch(
    }

    //this is to logout
    const x = { logout: () => {} }

    console.log(isCurrentUser);
    return (
        <div>
            <Button onClick={toggleDropdown}>{user.name}</Button>
            {isDropdownOpen && (
            <div>
              <PersonInfo user={user} isCurrentUser={isCurrentUser} />
              {isCurrentUser && ( //if a user's dropdown is the same as the logged in user, a button shows to 'update profile'
                <FilledButton onClick={openUpdateProfile}>Update Profile</FilledButton>
              )}
              {isOpen && (
                /* here is the window that opens if you click on 'Update Profile', need to fix style*/
              <UpdateUserProfile
                student={student}
                handleUpload={handleUpload}
                userData={user}
              />
              )}
            </div>
            )}
        </div>
    );
};

export default PersonDropDown;
