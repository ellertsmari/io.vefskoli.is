//<------ Module 5 group project ------>
// this is a PersonDropDown component, a dropdown that appears when clicking on a user in app/people/page.tsx
import React, { useEffect, useState } from 'react';
import { UserWithIdType } from '@/models/user';
import UpdateUserProfile from './updateProfile/updateProfile';
import PersonInfo from './personInfo';
import { Overlay } from './updateProfile/updateProfile-style';
import { Button, ArrowImage } from './person-style';
import Image from "next/image";
import dropdownArrow from "../../public/dropdownArrow.svg";

type Props = {
    user: UserWithIdType; // information about the users
    isCurrentUser: boolean; // Prop to be able to update profile for the user that is logged in
    isOpen: boolean; // state to control if the dropdown is open or closed
    toggleDropdown: () => void; //Function to toggle the dropdown open or closed
    onUserDataUpdate: (updatedUserData: UserWithIdType) => void; // Function to update user data
    refetch: () => void; // Function to refetch user data, ensuring the displayed info is current
};

// Animation settings for the dropdown arrow
const arrowAnimation = {
  closed: { rotate: 180 },
  open: { rotate: 0 },
};

const PersonDropDown = ({ user, isCurrentUser, isOpen, toggleDropdown, onUserDataUpdate, refetch }: Props) => {
    const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false); // this state is for the update profile window
    const student = user;
    const [userData, setUserData] = useState(user); // Initialize with default user data

    // function to open the update profile window
    const openUpdateProfile = () => {
      setIsUpdateProfileOpen(!isUpdateProfileOpen);
    };

    // function to close the update profile window
    const closeUpdateProfile = () => {
      setIsUpdateProfileOpen(false);
    };

    // Effect hook to update the local state when the user prop changes
    // so the displayed user data is always up-to-date
  useEffect(() =>{
    setUserData(user); //update local userData state when user information changes
  }, [user]);

    return (
        <div>
            <Button isOpen={isOpen} onClick={toggleDropdown}>{user.name}
              <ArrowImage
                variants={arrowAnimation}
                initial={"closed"}
                animate={isOpen ? "open" : "closed"}
              >
                <Image alt="dropdownArrow" src={dropdownArrow}/>
              </ArrowImage>
            </Button>
            {isOpen && (
            <div>
              <PersonInfo userData={userData} isCurrentUser={isCurrentUser} onOpenUpdateProfile={openUpdateProfile} />
              {isUpdateProfileOpen && (
                /* here is the window that opens if you click on 'Update Profile'*/
              <Overlay onClick={closeUpdateProfile}> // when clicking outside of the update window, it closes
              <UpdateUserProfile
                student={student}
                userData={userData}
                onClick={(e) => e.stopPropagation()} //making sure that when clicking on the window it doesn't close
                onUserDataUpdate={onUserDataUpdate} // pass it down to UpdateUserProfile
                refetch={refetch}
              />
              </Overlay>
              )}
            </div>
            )}
        </div>
    );
};

export default PersonDropDown;
