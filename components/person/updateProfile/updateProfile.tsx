'use client';
//this is a component for the "update profile" window, used on 'PeoplePage' through 'Person' component
import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { UserWithIdType } from '@/models/user';
import { UpdateContainer, IconContainer, ProfilePictureContainer, ProfilePicture, PrimaryContainer, Name, Email, InputText, FormUpdateProfile, ShortInput, FilledButton, ButtonWrapper, TextButton, EditIcon } from './updateProfile-style';


type Props = {
  student: UserWithIdType;
  //handleUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  userData: UserWithIdType;
  onClick:  React.MouseEventHandler<HTMLDivElement>;
};

const UpdateUserProfile = ({ student, userData, onClick }: Props) => {
    const [formValues, setFormValues] = useState({
        email: userData.email,
        name: userData.name,
        background: userData.background,
        careerGoals: userData.careerGoals,
        interests: userData.interests,
        favoriteArtists: userData.favoriteArtists,
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
  
    const x= { logout: () => {} };

  if (!student) return <>you need to log in</>;
  if (student) {
    console.log("Logged in user ID:", student._id);
  } else {
    console.log("No logged in user found");
  };

  return (
    <UpdateContainer onClick={onClick}>
        <PrimaryContainer className="user-pic/name">
            <IconContainer>
                <img src="/lightmode.svg" alt="Light-mode" />
                <Link onClick={x.logout} href="/authpage">
                    <img src="/logoutIcon.svg" alt="Logout" />
                </Link>
            </IconContainer>
            <ProfilePictureContainer>
                <ProfilePicture src={userData.avatarUrl || '/default-profile-picture.svg'} alt="user-pic"/>
                <EditIcon src="/edit.svg" alt="edit"/>
            </ProfilePictureContainer>
            <Name>{student?.name}</Name>
            <Email>{student?.email}</Email>
        </PrimaryContainer>
        <FormUpdateProfile onSubmit= {handleUpdateProfile}>
            <InputText>Picture URL</InputText>
            <ShortInput
                type='text'
                name='image'
                defaultValue={userData.avatarUrl || ''}
                //onChange={handleUpload}
            ></ShortInput>
            <InputText>Background - What have you studied or worked with?</InputText>
            <ShortInput
                type='text'
                name='background'
                defaultValue={userData.background || ''}
                onChange={handleInputChange}
            ></ShortInput>
            <InputText>Near future career goals?</InputText>
            <ShortInput
                type='text'
                name='careerGoals'
                defaultValue={userData.careerGoals || ''}
                onChange={handleInputChange}
            ></ShortInput>
            <InputText>Main interests?</InputText>
            <ShortInput
                type='text'
                name='interests'
                defaultValue={userData.interests || ''}
                onChange={handleInputChange}
            ></ShortInput>     
            <InputText>Favourite band/s or artist/s?</InputText>
            <ShortInput
                type='text'
                name='favoriteArtists'
                defaultValue={userData.favoriteArtists || ''}
                onChange={handleInputChange}
            ></ShortInput>
            <ButtonWrapper>
                <FilledButton type="submit">UPDATE</FilledButton>
                <TextButton>CHANGE PASSWORD</TextButton>
            </ButtonWrapper>
        </FormUpdateProfile>
    </UpdateContainer>
  );
};

export default UpdateUserProfile;
