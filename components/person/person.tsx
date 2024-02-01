import React, { useState } from 'react';
import { UserWithIdType } from '@/models/user';
import { Button} from './person-style';
import UpdateUserProfile from './updateProfile/updateProfile';
import PersonInfo from './personInfo';
import { Overlay } from './updateProfile/updateProfile-style';

type Props = {
    user: UserWithIdType;
    isCurrentUser: boolean; // I'm adding this prop to be able to update profile for the user that is logged in
};

const PersonDropDown = ({ user, isCurrentUser }: Props) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false); // state for the dropdown
    const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false); // this state is for the update profile window
    const student = user;

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const openUpdateProfile = () => {
      setIsUpdateProfileOpen(!isUpdateProfileOpen);
    };

    const closeUpdateProfile = () => {
      setIsUpdateProfileOpen(false);
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

    console.log("user = current user?", {isCurrentUser});
    return (
        <div>
            <Button onClick={toggleDropdown}>{user.name}</Button>
            {isDropdownOpen && (
            <div>
              <PersonInfo user={user} isCurrentUser={isCurrentUser} onOpenUpdateProfile={openUpdateProfile} />
              {isUpdateProfileOpen && (
                /* here is the window that opens if you click on 'Update Profile', need to fix style*/
              <Overlay onClick={closeUpdateProfile}>
              <UpdateUserProfile
                student={student}
                //handleUpload={handleUpload}
                userData={user}
                onClick={(e) => e.stopPropagation()}
              />
              </Overlay>
              )}
            </div>
            )}
        </div>
    );
};

export default PersonDropDown;
