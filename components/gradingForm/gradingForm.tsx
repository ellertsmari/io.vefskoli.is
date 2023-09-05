import { useState } from "react";
import {
  BackgroundOverlay,
  FeedbackGrade,
  FormContainer,
  Modal,
  ProjectTitle,
  ReturnDetails,
} from "./gradingForm.style";
import { FilledButton } from "../buttons";
import { Types } from "mongoose";
import { connectToDatabase } from "@/utils/mongoose-connector";
import { Return, ReturnType } from "@/models/return";
import { GuideType } from "@/models/guide"; 

const getGuide = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }
  const objectId = new Types.ObjectId(id);
  await connectToDatabase();
  type OmitGuideFromReturn = Omit<ReturnType, "guide">;

  type ReturnWithGuide = OmitGuideFromReturn & {
    guide: GuideType;
  };
  const r: ReturnWithGuide | null = (await Return.findOne({
    _id: objectId,
  }).populate("guide")) as ReturnWithGuide | null;
  return r;
};

const GradingForm = async ({ params }: { params: { id: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  // make a styled div with contenteditable that looks nice:

  const r = await getGuide(params.id);
  if (!r) {
    return (
      <>
        <h1>Guide not found</h1> <h2>{params.id}</h2>
      </>
    );
  }

  return (
    <>
      <FilledButton onClick={() => setIsOpen(!isOpen)}>Open</FilledButton>
      {isOpen && (
        <BackgroundOverlay>
          <Modal>
            <ProjectTitle></ProjectTitle>
            <FormContainer>
              <ReturnDetails></ReturnDetails>
              <FeedbackGrade>
                <FilledButton onClick={() => setIsOpen(!isOpen)}>
                  SUBMIT
                </FilledButton>
              </FeedbackGrade>
            </FormContainer>
          </Modal>
        </BackgroundOverlay>
      )}
    </>
  );
};

export default GradingForm;
