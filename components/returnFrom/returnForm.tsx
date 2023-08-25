"use client";

import { FilledButton, TextButton } from "../buttons";
import { useState, KeyboardEventHandler, ChangeEvent } from "react";
import { BackgroundOverlay, FormContainer, Modal } from "./returnFrom.style";
import { BigInput, MidInput } from "../inputs";
import { InputLabel } from "../inputs/lables/lable";
import { ReturnType } from "@/models/return";
import { Types } from "mongoose";
import useUser from "@/utils/useUser";

const ReturnForm = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [projectUrl, setProjectUrl] = useState("");
    const [liveVersion, setLiveVersion] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [projectName, setProjectName] = useState("");
    const [comment, setComment] = useState("");

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

      const user = useUser();
    
    const createReturn = () => {
      const r: ReturnType = {
        projectUrl,
        liveVersion,
        pictureUrl,
        projectName,
        comment,
        owner: user,
        createdAt: { type: Schema.Types.Date, required: true },
        guide:{ type: Schema.Types.ObjectId, required: true },
      }
      fetch("/api/returns",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({})
      })
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
