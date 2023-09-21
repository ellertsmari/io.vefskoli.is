'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { ProfileModal, ProfileImage } from './profile.style'

import { UserWithIdType } from '@/models/user'
import { ChangeEvent } from 'react'

type Props = {
  user: UserWithIdType
}

const Profile = ( { user }:Props ) => {
  const student = user;
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleUpload = async (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const data = new FormData();
    const files = e.target.files as FileList;
    data.append('file', files[0]);
    data.append('upload_preset', 'profile-pictures');
    //const res = await fetch(
  }
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
  const x = { logout: () => {} }
  return(
    <div>
      <ProfileImage onClick={() => setIsOpen(!isOpen)} src="/default-profile-picture.svg"/>
      {isOpen && (
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
  )
}
export default Profile;