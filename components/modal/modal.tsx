"use client"
import { BulletList } from "@/styles/pageStyles/review.styles";
import { useState, useEffect } from "react";
import styled from "styled-components"
type Props = {
    ZoomVideo:{};
}
const Modal =() => {
const ClickArea = styled.div `
width:250px;
height:250px;
background-color: #D1D1D1;
border-radius: 20px;
display: flex;
  justify-content: center;
  align-items: center;

    
   
    
    


`
const OverLay = styled.div`
width: 94%;
height: 950px;
position: absolute;
background-color: grey;
border-radius: 30px;
top:3%;
right: 3%;

`
const CloseButton = styled.button`
background-color:#6563EB;
border: none;
color: white;
padding: 10px 22px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
cursor: pointer;
border-radius: 100px;
position: absolute; 
  right: 15px; 
  top:15px;
`;

const [isOpen, setIsOpen ]= useState (false)
const showModal =()=>{
setIsOpen (true)
}
const closeModal = () =>{
setIsOpen (false)

}
return (
    <div>
        <ClickArea onClick={showModal}>GUIDE 1</ClickArea>

       {isOpen&& <OverLay>Content Modal has to be here <CloseButton onClick={closeModal}>Close</CloseButton>
       </OverLay>

       }
    </div>
)

} 
export default Modal

