"use client";

import { FilledButton, TextButton } from "../buttons";
import { useState, KeyboardEventHandler, ChangeEvent, useEffect } from "react";
import { BackgroundOverlay, FormContainer, Modal } from "./returnFrom.style";
import { BigInput, MidInput } from "../inputs";
import { InputLabel } from "../inputs/lables/lable";
import { ReturnType } from "@/models/return";
import { UserType } from "@/models/user";
import { Types, set } from "mongoose";
import useUser from "@/utils/useUser";
import { useRouter } from "next/navigation";

const ReturnForm = ({guideId}:{guideId:Types.ObjectId}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectUrl, setProjectUrl] = useState("");
  const [liveVersion, setLiveVersion] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [projectName, setProjectName] = useState("");
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const stateMap = {
      projectUrl: setProjectUrl,
      liveVersion: setLiveVersion,
      pictureUrl: setPictureUrl,
      projectName: setProjectName,
      comment: setComment
    };
    (stateMap as any)[name](value);
  }

  const handleTextArea: KeyboardEventHandler<HTMLTextAreaElement> = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;
    setComment(value)
  }
  const {user} = useUser();
  
  console.log("user is: ",user);
  if (!user) return <>You are not logged in, if you  want to return this guide you need to log in via authpage</>;
  

  const createReturn = () => {
    console.log("creating return")
    const r: ReturnType = {
      projectUrl,
      liveVersion,
      pictureUrl,
      projectName,
      comment,
      owner: user._id!,
      createdAt: new Date(),
      guide: guideId,
    }
    console.log("return is: ",r);
    fetch("/api/returns",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(r)
    }).then(res => res.json()).then(data => {
      console.log(data)
      router.push("/guides"); //guide shows as not returned but will get fixed when confetti is added
    });
  }
  return (
    <>
      <FilledButton style={{ width: "100%"}} onClick={() => setIsOpen(!isOpen)}>
        RETURN
      </FilledButton>
      {isOpen &&(
      <BackgroundOverlay>
      <Modal>
        <FormContainer>
        <InputLabel>Code/ Design URL (Give access to your code and/or design files)</InputLabel>
        <MidInput onChange={handleChange} name="projectUrl" required></MidInput>
        <InputLabel>Live Version URL (Give access to your live version)</InputLabel>
        <MidInput onChange={handleChange} name="liveVersion"></MidInput>
        <InputLabel>Link pictures (An Image or Gif for your project)</InputLabel>
        <MidInput onChange={handleChange} name="pictureUrl"></MidInput>
        <InputLabel>Your project name</InputLabel>
        <MidInput onChange={handleChange} name="projectName"></MidInput>
        <InputLabel>Comment</InputLabel>
        <BigInput onKeyDown={handleTextArea} name="comment"></BigInput>
        <div style={{display:"flex", width:"100%", justifyContent:"center", marginTop:"3rem"}}>
        <FilledButton onClick={() => {createReturn()}}>RETURN</FilledButton>
        </div>
        </FormContainer>
        <TextButton onClick={() => setIsOpen(!isOpen)}>CLOSE</TextButton>
      </Modal>
      </BackgroundOverlay>
      )}
    </>
  );
};

export default ReturnForm;
