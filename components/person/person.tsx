import React, { useState } from 'react';
import { UserWithIdType } from '@/models/user';
import UpdateUserProfile from './updateProfile/updateProfile';
import PersonInfo from './personInfo';
import { Overlay } from './updateProfile/updateProfile-style';
import { Container, PrimaryContainer, SecondaryContainer, ProfilePicture, Button, EmailFont, NameFont, InfoFont, ArrowImage } from './person-style';
import Image from "next/image";
import dropdownArrow from "../../public/dropdownArrow.svg";

type Props = {
    user: UserWithIdType;
    isCurrentUser: boolean; // Prop to be able to update profile for the user that is logged in
    isOpen: boolean;
    toggleDropdown: () => void;
};

const arrowAnimation = {
  closed: { rotate: 180 },
  open: { rotate: 0 },
};

const PersonDropDown = ({ user, isCurrentUser, isOpen, toggleDropdown }: Props) => {
    const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false); // this state is for the update profile window
    const student = user;

    const openUpdateProfile = () => {
      setIsUpdateProfileOpen(!isUpdateProfileOpen);
    };

    const closeUpdateProfile = () => {
      setIsUpdateProfileOpen(false);
    };

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
              <PersonInfo user={user} isCurrentUser={isCurrentUser} onOpenUpdateProfile={openUpdateProfile} />
              {isUpdateProfileOpen && (
                /* here is the window that opens if you click on 'Update Profile'*/
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
