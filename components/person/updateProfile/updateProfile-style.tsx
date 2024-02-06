"use client"
import styled from "styled-components";

export const UpdateContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
  height: auto;
  border-radius: 5rem;
  width: 424px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  padding: 26px;
  overflow-y: auto; // Add scroll for vertical content
  max-height: 80%; // Set a maximum height relative to the viewport
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.25);
    .edit {
      margin-right: 10px;
      z-index:3;
    }
`
export const PrimaryContainer = styled.div`
  width: 100%;
  padding-top: 250px;
  display: flex; 
  flex-direction: column;
  align-items: center;
`;
export const IconContainer = styled.div `
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const ProfilePictureContainer = styled.div `
position: relative;
width: 140px;
height: 140px;
`;
export const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 140px;
  height: 140px;
  object-fit: cover;
`;
export const EditIcon = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer; 
`;

export const Name = styled.h3`
  margin-top: 16px;
  font-family: Poppins;
  font-size: 18px;
  font-weight: 400;
`;
export const Email = styled.h4`
  font-family: Poppins;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 400;
`;

export const FormUpdateProfile = styled.form`
  display: flex;
  flex-direction: column;
`;
export const InputText = styled.label`
  width: 364px;
  text-align: left;
  font-family: Poppins;
  font-size: 14px;
  margin: 1rem;
  margin-top: 1.75rem;
`;
export const ShortInput = styled.input`
  align-self: center;
  box-sizing: border-box;
  width: 364px;
  height: 42px;
  background: #f1f1f1;
  border: 1px solid #e6e6e6;
  border-radius: 15px;
  padding-left: 1.5rem;
  font-family: Poppins;
  font-size: 14px;
  outline: none;
  transition: 0.1s ease-in-out;

  &:focus{
    border: 1px solid #3B3A96;
  }

  &:hover{
    border-color: #6563EB;
  }
`;
//Wrapping filled and text buttons
export const ButtonWrapper = styled.div `
display: flex;
flex-direction: column;
align-items: center;
margin-top: 5rem;
width: 100%;
gap: 0.5rem;
`;
export const FilledButton = styled.button`
  text-decoration: none;
  text-align: center;
  width: auto;
  padding: 10px 15px;
  height: 34px;
  border-radius: 10.0rem;
  background-color: #6563EB;
  box-shadow: 1px 1px 5px 1px rgba(81, 81, 81, 0.25);
  border-style: none;
  color: white;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover{
    background-color: #3B3A96;
  }
`;
export const TextButton = styled.a`
  height: 4rem;
  background-color: rgba(255,255,255,0);
  border-style: none;
  color: #999999;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover{
    color: #3B3A96;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent black
  z-index: 2; // Ensure this is below the modal but above everything else
  display: flex;
  justify-content: center;
  align-items: center;
`;