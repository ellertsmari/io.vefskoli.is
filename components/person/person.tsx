import React, { ChangeEvent, useState } from 'react';
import { UserWithIdType } from '@/models/user';
import { Container, PrimaryContainer, SecondaryContainer, ProfilePicture, Button, EmailFont, NameFont, InfoFont} from './person-style';
import UpdateUserProfile from './updateProfile/updateProfile';
import { FilledButton } from '../buttons';
import PersonInfo from './personInfo';

type Props = {
    user: UserWithIdType;
    isCurrentUser: boolean; // I'm adding this prop to be able to update profile for the user that is logged in
};


const PersonDropDown = ({ user, isCurrentUser }: Props) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false); // state for the dropdown
    const [isOpen, setIsOpen] = useState(false); // this state is for the update profile window
    const student = user;

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const openUpdateProfile = () => {
      setIsOpen(!isOpen);
    };

    //this is to upload a profile picture
    /*const handleUpload = async (e:ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const data = new FormData();
      const files = e.target.files as FileList;
      data.append('file', files[0]);
      data.append('upload_preset', 'profile-pictures');
      //const res = await fetch(
    }*/

    //this is to logout
    const x = { logout: () => {} }

    console.log("user = current user?", {isCurrentUser});
    return (
        <div>
            <Button onClick={toggleDropdown}>{user.name}</Button>
            {isDropdownOpen && (
            <div>
              <PersonInfo user={user} isCurrentUser={isCurrentUser} onOpenUpdateProfile={openUpdateProfile} />
              {isOpen && (
                /* here is the window that opens if you click on 'Update Profile', need to fix style*/
              <UpdateUserProfile
                student={student}
                //handleUpload={handleUpload}
                userData={user}
              />
              )}
            </div>
            )}
        </div>
    );
};

export default PersonDropDown;
