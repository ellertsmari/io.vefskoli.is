"use client"
import { BulletList } from "@/styles/pageStyles/review.styles";
import { useState, useEffect } from "react";
import styled from "styled-components"
const Modal =() => {
const ClickArea = styled.div `
width:250px;
height:250px;
background-color: pink;

`
const OverLay = styled.div`
width: 700px;
height: 700px;
position: absolute;
background-color: yellow;
`
const [isOpen, setIsOpen ]= useState (false)
const showModal =()=>{
setIsOpen (true)
}
const closeModal = () =>{
setIsOpen (false)

}
return (
    <div>
        <ClickArea onClick={showModal}> </ClickArea>

       {isOpen&& <OverLay>Content Modal has to be here <button onClick={closeModal}></button>
       </OverLay>

       }
    </div>
)

} 
export default Modal

