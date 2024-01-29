import React, { ChangeEvent, useState } from 'react';
import { UserWithIdType } from '@/models/user';
import { Container, PrimaryContainer, SecondaryContainer, ProfilePicture, Button, EmailFont, NameFont, InfoFont} from './person-style';
import { ProfileModal } from '../sidebar/profile/profile.style';
import UpdateUserProfile from './updateProfile/updateProfile';
import Link from 'next/link';

type Props = {
    user: UserWithIdType;
    isCurrentUser: boolean; // I'm adding this prop to be able to update profile for the user that is logged in
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
    const updateProfile = async (e:ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const res = await fetch(
        `/api/users/${student._id}`,
        {
          method: 'PATCH',
          body: data,
        }
      );
    }

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
                <Button onClick={openUpdateProfile}>Update Profile</Button>
              )}
              {isOpen && (
                /* here is the window that opens if you click on 'Update Profile', need to fix style*/
                /*maybe it would be better to have this as a component*/
              <UpdateUserProfile
                student={student}
                updateProfile={updateProfile}
                handleUpload={handleUpload}
              />
                  
              )}
            </div>
            )}
        </div>
    );
};

export default PersonDropDown;
