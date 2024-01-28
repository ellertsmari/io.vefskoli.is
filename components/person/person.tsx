import React, { ChangeEvent, useState } from 'react';
import { UserWithIdType } from '@/models/user';
import { Container, PrimaryContainer, SecondaryContainer, ProfilePicture, Button, EmailFont, NameFont, InfoFont} from './person-style';
import { ProfileModal } from '../sidebar/profile/profile.style';
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
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // this is for the update profile window
    const student = user;

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

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
              {isCurrentUser && (
                <Button onClick={() => setIsOpen(!isOpen)}>Update Profile</Button>
              )}
              {isOpen && (
                /* here is the window that opens if you click on 'Update Profile', need to fix style*/
                /*maybe it would be better to have this as a component*/
              <ProfileModal>
                  <div className="user-pic/name">
                  <Link className="logout" onClick={x.logout} href="/authpage">Logout</Link>
                  <div>
                    <img className='default-profile-picture' src="/default-profile-picture.svg" alt="user-pic"/>
                  </div>
                  <div className="user-name">
                    <h3 style={{fontSize: "1.8rem", fontWeight: "400"}}>{student?.name}</h3>
                    <p style={{fontSize: "1.6rem"}}>{student?.email}</p>
                  </div>
                  <div className='pictureurl'>
                    <p className='pictureurltxt'>Picture URL</p>
                    <input className="URLpicinput" type="text" name="image" onChange={handleUpload}></input>
                  </div>
                  </div>
                  <form onSubmit= {updateProfile} className='form-container'>
                    <label className="profiletxt">Background - What have you studied or worked with?</label>
                    <textarea className="profileinput" name="background"  ></textarea>
                    <label className="profiletxt" >Near future career goals?</label>
                    <textarea className="profileinput" name="careerGoals" ></textarea>
                    <label className="profiletxt">Main interests?</label>
                    <textarea className="profileinput" name="interests"  ></textarea>
                    <label className="profiletxt">Favourite band/s or artist/s</label>
                    <textarea className="profileinput" name="favoriteArtist"></textarea>
                    <button className='savebtn'>SAVE</button>
                </form>
              </ProfileModal>
              )}
            </div>
            )}
        </div>
    );
};

export default PersonDropDown;
