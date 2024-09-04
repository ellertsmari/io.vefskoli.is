"use client";
import { MouseEvent, FormEvent, useRef, useState, useEffect } from "react";
import { FilledButton } from "../buttons/filledButton";
import {
  Comment,
  SubTitle,
  ReviewFrame,
  Tip,
  Label,
  Title,
  Container,
  Checklist,
  ChecklistItem,
  SubList,
} from "@/styles/pageStyles/review.styles";
import { ObjectId } from "mongodb";
import { Error } from "../guides/styles";
import { useRouter } from "next/navigation";
import Spinner from "../spinner/spinner";
import { SP } from "next/dist/shared/lib/utils";
import { GuideType } from "@/models/guide";

type Props = {
  returnId: string;
  userId: ObjectId;
  guide:  Omit<GuideType, '_id'> & { _id: string };
};

const ReviewComment = ({ returnId, userId, guide }: Props) => {
  const [improvement, setImprovement] = useState(<></>);
  const [isLoading, setIsLoading] = useState(false); //this is needed so that students won't spam the submit button
  const [vote, setVote] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();


  //const improveFeedback = async (e: MouseEvent) => {
  //   setImprovement("Loading...");
  //   const improvedFeedback = await fetch(
  //     `/api/improveFeedback?feedback=${commentRef.current?.innerText}`
  //   );
  //   const json = await improvedFeedback.json();
  //   console.log("improve feedback", json);
  //   setImprovement(json.message.content);
  useEffect(() => {
    if (guide.category === "code") {
      setImprovement(
        <Container>
          <Title>Code Review Checklist</Title>
          <Checklist>
            <ChecklistItem>
              <p>Is the code easy to read?</p>
            </ChecklistItem>
            <ChecklistItem>
              <p>Are things named so that they are easy to understand?</p>
              <SubList>
                <li>HTML classes</li>
                <li>Variables</li>
                <li>File names</li>
              </SubList>
            </ChecklistItem>
            <ChecklistItem>
              <p>Is the setup clean?</p>
              <SubList>
                <li>Indentation</li>
                <li>Space between lines</li>
              </SubList>
            </ChecklistItem>
            <ChecklistItem>
              <p>Are there comments when there need to be comments (if it is a complicated piece of code)?</p>
            </ChecklistItem>
          </Checklist>
        </Container>
      )
    } else if (guide.category === "design") {
      setImprovement(
        <Container>
          <Title>Design Review Checklist</Title>
          <Checklist>
            <ChecklistItem>
              <p>Is the design easy to understand and navigate?</p>
            </ChecklistItem>
            <ChecklistItem>
              <p>Is the spacing and alignment consistent?</p>
            </ChecklistItem>
            <ChecklistItem>
              <p>Is the visual hierarchy clear?</p>
            </ChecklistItem>
            <ChecklistItem>
              <p>Is the design accessible?</p>
            </ChecklistItem>
            <ChecklistItem>
              <p>Is the file setup optimized for collaboration and future updates?</p>
            </ChecklistItem>
            <ChecklistItem>
              <p>Does the design reflect a cohesive and modern brand identity?</p>
              <SubList>
                <li>Is there consistency in the use of branding elements?</li>
              </SubList>
            </ChecklistItem>
            <ChecklistItem>
              <p>Are animations and transitions used thoughtfully?</p>
            </ChecklistItem>
          </Checklist>
        </Container>
      )
    };
  }, []);
  const commentRef = useRef<HTMLDivElement>(null);

  const createReview = async (e: MouseEvent) => {
    if (vote === "") {
      setError("Please vote");
      return;
    } else if (commentRef.current?.innerText.length! < 5) {
      setError("Please comment");
      return;
    }
    setIsLoading(true);
    const review = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({
        comment: commentRef.current?.innerText,
        return: returnId,
        owner: userId,
        vote: vote,
        guide: guide._id,
        projectUrl: "kalli", // I have no Idea why I get errors when I don't include projectURL
      }),
    });
    const json = await review.json();
    console.log("review", json);
    router.push(`/guides`);
    //setIsLoading(false);
    router.refresh();
  };
  const createVote = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    console.log("create vote");
    console.log(value);
    setVote(value);
  };
  return (
  <>
  <ReviewFrame>
      <Error>{error}</Error>
      <SubTitle>Vote</SubTitle>
      <form>
        <input type="radio" name="vote" value="pass" onChange={createVote} />
        <Label>pass</Label>
        <br />
        <input type="radio" name="vote" value="no pass" onChange={createVote} />
        <Label>no pass</Label>
        <br />
        <input
          type="radio"
          name="vote"
          value="recommend to Hall of fame"
          onChange={createVote}
        />
        <Label>recommend to Hall of fame</Label>
      </form>
      </ReviewFrame>
      <Tip>{improvement}</Tip>
      <SubTitle>Comment</SubTitle>
      <Comment ref={commentRef} contentEditable></Comment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isLoading ? (
          <Spinner></Spinner>
        ) : (
          <FilledButton onClick={createReview}>Submit</FilledButton>
        )}
      </div>
      </>
  );
};

export default ReviewComment;
