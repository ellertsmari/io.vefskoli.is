import styled from 'styled-components'
//import dropdownArrow from '@/public/dropdownArrow'

export const Container = styled.div`
    margin-top: 10px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    background-color: #f9f9f9;
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

export const Button = styled.button`
    width: 100%;
    background-color: #f9f9f9;
    color: #666666;
    font-style: Poppins;
    padding: 16px;
    cursor: pointer;
    border-radius: 30px;
    display: inline-block;
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
        color:white;
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
    font-weight: bold;
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,500&display=swap');
`; 