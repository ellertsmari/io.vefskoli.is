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
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin-right: 10px;
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
    width: 100vh;
    background-color: #f9f9f9;
    color: #666666;
    font-style: Poppins;
    padding: 16px;
    cursor: pointer;
    border-radius: 30px;
    display: inline-block;
    position: relative;
    margin-bottom: 10px;
`;

export const NameFont = styled.h2`
    font-style: Poppins;
    font-size: 24px;
`
export const EmailFont = styled.h3`
    font-style: Poppins;
    font-size: 20px;
`
export const InfoFont = styled.p`
    font-style: Poppins;
    font-size: 16px;
`