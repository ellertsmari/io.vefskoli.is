import styled from 'styled-components'
import { motion } from 'framer-motion';

export const Container = styled.div`
    margin-top: 10px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    background-color: #FFFFFF;
    color: #000;
    display: flex;
    

`;
export const PrimaryContainer = styled.div`
    margin-top: 10px;
    padding: 10px;
    align-items: center;
`;

export const SecondaryContainer = styled.div`
    margin-top: 10px;
    padding: 10px;
`;


export const ProfilePicture = styled.img`
    border-radius: 50%;
    margin-right: 10px;
    margin-left: 25px;
    width: 104px;
    height: 104px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    flex-direction: column;
    width: 100%;
    position: relative;
`;

export const Button = styled.button<{ isOpen?: boolean }>`
    width: 100vh;
    background-color: ${(props) => (props.isOpen ? '#6563eb' : '#FFFFFF')};
    color: ${(props) => (props.isOpen ? '#ffffff' : '#666666')};
    font-style: Poppins;
    padding: 16px;
    cursor: pointer;
    border-radius: 30px;
    display: flex;
    position: relative;
    margin-bottom: 10px;
    box-shadow: 1px 1px 4px 1px #00000040;
    border: none;
    border-radius: 3.5rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    text-align: left;

    :hover{
        background-color: #6563eb;
        color: white;
    }

    @media (max-width: 768px), (max-width: 1024px) {
        width: 100%;}
`;

export const JokeContainer = styled.div`
    margin-top: 10px;
    width: 100vh;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 15px;
    background-color: #FFFFFF;
    color: #000;
    display: flex;
    z-index: 1;
    position: relative;
    `;

export const FilledButton = styled.button`
    text-decoration: none;
    text-align: center;
    width: 8rem;
    height: 2rem;
    border-radius: 10.0rem;
    background-color: #6563EB;
    box-shadow: 1px 1px 5px 1px rgba(81, 81, 81, 0.25);
    border-style: none;
    color: white;
    font-weight: 500;
    font-size: 10px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    justify-content: center;
    align-items: center;
    margin-left: 25px;
    margin-top: 6px;

&:hover{
    background-color: #3B3A96;
    }
    `;

export const NameFont = styled.h2`
    font-family: 'Poppins';
    font-size: 24px;
    align-items: center;
    justify-content: center;
    display: flex;
`;

export const EmailFont = styled.h3`
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,500&display=swap');
`; 

export const InfoFont = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
`; 

export const StyleDiv = styled.div`
  margin-bottom: 6px;
  padding-top: 8px;
`; 

export const QuestionFont = styled.h3`
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
`

export const ArrowImage = motion(styled.div`
    margin-left: auto;
    `);