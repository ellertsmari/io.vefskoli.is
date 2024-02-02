'use client';
//<------ Module 5 group project ------>
//this is a component: a "update profile" window, used in 'Person' component: app/components/person/person.tsx
import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { UserWithIdType } from '@/models/user';
import { UpdateContainer, IconContainer, ProfilePictureContainer, ProfilePicture, PrimaryContainer, Name, Email, InputText, FormUpdateProfile, ShortInput, FilledButton, ButtonWrapper, TextButton, EditIcon } from './updateProfile-style';


type Props = {
  student: UserWithIdType; // the student that will be updated
  userData: UserWithIdType; // current user data to pre-fill the update form
  onClick:  React.MouseEventHandler<HTMLDivElement>; //handle click events
  onUserDataUpdate: (updatedUserData: UserWithIdType) => void; // function to display the updated user data
  refetch: () => void; //function to refetch "logged in user" data
};

const UpdateUserProfile = ({ student, userData, onClick, onUserDataUpdate, refetch }: Props) => {
    const [updateMessage, setUpdateMessage] = useState(''); // state for managing messages if update was successful or not
    const [formValues, setFormValues] = useState({ //pre-fill form values inside the inputs with the userData
        email: userData.email,
        name: userData.name,
        background: userData.background,
        careerGoals: userData.careerGoals,
        interests: userData.interests,
        favoriteArtists: userData.favoriteArtists,
    });
    
    // function to handle changes in the inputs of the form (changing the text)
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target; // Get the name and value of the changed input
        setFormValues(prevState => ({
            ...prevState, // keep all the other form values
            [name]: value, // update the value that changed
        }));
    };

    // function to handle the submission of the form to be updated
    const handleUpdateProfile = async (e:ChangeEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent the default form submit action
        
        try { // a PUT request to api/users/[uid] with the updated data
            const response = await fetch(`/api/users/${student._id}`, {
                method: 'PUT', 
                headers: {'Content-Type': 'application/json'}, // telling where the JSON content should go
                body: JSON.stringify(formValues), // Convert form values to JSON string
            });

            // message displayed if update was successful or not
            if (response.ok) {
                const updatedData = await response.json();
                setUpdateMessage('Update successful');
                onUserDataUpdate(updatedData); //notify the parent to update the global userData
                refetch(); // refetch logged-in user data
                console.log("Update successful:", updatedData);
              } else {
                setUpdateMessage('Failed to upload');
                console.error("Error response:", response.status, response.statusText);
              }
        } catch (error) { // if the fetch failed the console shows error message
            console.error('Error updating profile:', error);
        }
    };
  
    // logout function - does not log you out - only redirects you to login page
    const x= { logout: () => {} };

    // if the student is not found, this message shows
  if (!student) return <>you need to log in</>;
  
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
                {updateMessage && <Email>{updateMessage}</Email>}
            </ButtonWrapper>
        </FormUpdateProfile>
    </UpdateContainer>
  );
};

export default UpdateUserProfile;
