//'use client';
//this is a component for the "update profile" window, used on 'PeoplePage' through 'Person' component
import React, { ChangeEvent } from 'react';
import Link from 'next/link';
import { UserWithIdType } from '@/models/user';
import { ProfileModal } from '@/components/sidebar/profile/profile.style';

type Props = {
  student: UserWithIdType;
  updateProfile: (e: ChangeEvent<HTMLFormElement>) => Promise<void>;
  handleUpload: (e: ChangeEvent<HTMLInputElement>) => void;
};

const UpdateUserProfile = ({ student, updateProfile, handleUpload }: Props) => {
  
  const logout = () => {}; //I have to deside what happens when you logout

  return (
    <ProfileModal>
        <div className="user-pic/name">
            <Link className="logout" onClick={logout} href="/authpage">Logout</Link>
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
  );
};

export default UpdateUserProfile;
