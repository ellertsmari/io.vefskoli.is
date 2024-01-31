"use client"
import { useState, useEffect } from "react";
import styled from "styled-components"


type Props = {
    ZoomVideo:{
        recording_files:{
            download_url:string
            file_type: string
        }[]
        topic:string 
        
    };
}

const Modal =({ZoomVideo}:Props) => {
  console.log (ZoomVideo)
  
  const ClickArea = styled.div `
    width:250px;
    height:250px;
    background-color: #a2a1f3c2;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    padding: 20px;
    overflow-wrap: break-word; //For the text to break  if it's too long
    word-wrap: break-word;
  `

  const OverLay = styled.div`
    width: 94%;
    height: 100%;  //changed this to 100% so it would fit the window it is in
    position: absolute;
    background-color: #e8e7f8;
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

  const Video = styled.video`
    width: 90%;
    height: 90%;
    object-fit: contain; // keeps aspect ratio of the video intact. Using fill distorted it. 
    padding: 40px; // Added padding around the video so it would stay within the overlay
  `

  const [isOpen, setIsOpen ]= useState (false)
  
  const showModal =()=>{
    setIsOpen (true)
  }
  const closeModal = () =>{
    setIsOpen (false)
  }
   const videoUrl= ZoomVideo.recording_files [0].file_type==="MP4"? ZoomVideo.recording_files[0].download_url:ZoomVideo.recording_files[1].download_url
  return (
    <div>
          <ClickArea onClick={showModal}>    
            {ZoomVideo.topic}
          </ClickArea>
          {isOpen && 
            <OverLay>
              <CloseButton onClick={closeModal}>Close</CloseButton>
              <Video width="320" height="240" controls>
                <source src={videoUrl} />
              </Video>
            </OverLay>
          }
    </div>
  );
}

export default Modal

/*
It would be ideal to have the ClickArea show a thumbnail of each video,
but the Zoom API doesn't provide them. We would need to generate them ourselves, 
host them fex. in a cloud and then pass the url of each thumbnail to the ClickArea component. 
*/