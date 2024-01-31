'use client';
//this is a component for the "update profile" window, used on 'PeoplePage' through 'Person' component
import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { UserWithIdType } from '@/models/user';
import { ProfileModal } from '@/components/sidebar/profile/profile.style';
import { InputLabel, ShortInput } from '@/components/inputs';
import { ButtonWrapper } from '@/styles/pageStyles/authpage.styles';
import { DropdownButton } from '@/components/dropDown/styles';
import { FilledButton } from '@/components/buttons';


type Props = {
  student: UserWithIdType;
  handleUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  userData: UserWithIdType;
};

const UpdateUserProfile = ({ student, handleUpload, userData }: Props) => {
    const [formValues, setFormValues] = useState({
        email: userData.email,
        name: userData.name,
        background: userData.background,
        careerGoals: userData.careerGoals,
        interests: userData.interests,
        favoriteArtists: userData.favoriteArtists,
        // Include other fields as necessary
    });
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    //Bjork figuring out how to update profile
    const handleUpdateProfile = async (e:ChangeEvent<HTMLFormElement>) => {
        console.log("Form submission initiated");
        e.preventDefault();
        console.log("Form submission initiated");
        
        try {
            console.log(`/api/users/${student._id}`);
            const response = await fetch(`/api/users/${student._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formValues),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Update successful:", responseData);
              } else {
                console.error("Error response:", response.status, response.statusText);
              }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
  
    const logout = () => {}; //I have to deside what happens when you logout

  if (!student) return <>you need to log in</>;
  if (student) {
    console.log("Logged in user ID:", student._id);
  } else {
    console.log("No logged in user found");
  };

  return (
    <ProfileModal>
        <div className="user-pic/name">
            <Link className="logout" onClick={logout} href="/authpage">Logout</Link>
            <div>
                <img className='default-profile-picture' src={userData.avatarUrl} alt="user-pic"/>
            </div>
            <div className="user-name">
                <h3 style={{fontSize: "1.8rem", fontWeight: "400"}}>{student?.name}</h3>
                <p style={{fontSize: "1.6rem"}}>{student?.email}</p>
            </div>
        </div>
        <form onSubmit= {handleUpdateProfile} className='form-container'>
            <InputLabel>Picture URL</InputLabel>
            <ShortInput
                type='text'
                name='image'
                defaultValue={userData.avatarUrl}
                onChange={handleUpload}
            ></ShortInput>
        
        
            <InputLabel>Background - What have you studied or worked with?</InputLabel>
            <ShortInput
                type='text'
                name='background'
                defaultValue={userData.background}
                onChange={handleInputChange}
            ></ShortInput>
            <InputLabel>Near future career goals?</InputLabel>
            <ShortInput
                type='text'
                name='careerGoals'
                defaultValue={userData.careerGoals}
                onChange={handleInputChange}
            ></ShortInput>
            <InputLabel>Main interests?</InputLabel>
            <ShortInput
                type='text'
                name='interests'
                defaultValue={userData.interests}
                onChange={handleInputChange}
            ></ShortInput>     
            <InputLabel>Favourite band/s or artist/s?</InputLabel>
            <ShortInput
                type='text'
                name='favouriteBands'
                defaultValue={userData.favoriteArtists}
                onChange={handleInputChange}
            ></ShortInput>
            <ButtonWrapper>
                <FilledButton type="submit">Update</FilledButton>
            </ButtonWrapper>
        </form>
    </ProfileModal>
  );
};

export default UpdateUserProfile;
