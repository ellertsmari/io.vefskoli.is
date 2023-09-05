'use client'
import {MouseEvent, FormEvent, useRef, useState} from 'react';
import { FilledButton } from '../buttons/filledButton';
import { Comment, SubTitle, ReviewFrame, Loader, Tip } from '@/styles/pageStyles/review.styles';
import { ObjectId } from "mongodb";
import { Error } from '@/styles/pageStyles/guides.styles';

type Props = {
  returnId: string;
  userId: ObjectId;
  guideId: ObjectId;
}

const ReviewComment = ({returnId, userId, guideId}:Props) => {
  const [improvement, setImprovement] = useState<string>("");
  const [vote, setVote] = useState<string>("");
  const [error, setError] = useState<string>("");

  const improveFeedback = async (e:MouseEvent) => {
    setImprovement("Loading...");
    const improvedFeedback = await fetch(`/api/improveFeedback?feedback=${commentRef.current?.innerText}`);
    const json = await improvedFeedback.json();
    console.log("improve feedback", json);
    setImprovement(json.message.content);
  }
  const commentRef = useRef<HTMLDivElement>(null);
  const createReview = async (e:MouseEvent) => {
    if (vote==="") {
      setError("Please vote");
      return;
    }
    else if (commentRef.current?.innerText.length!<5) {
      setError("Please comment");
      return;
    }
    const review = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({
        comment: commentRef.current?.innerText,
        return: returnId,
        owner: userId,
        vote: vote,
        guide: guideId,
        projectUrl: "kalli", // I have no Idea why I get errors when I don't include projectURL
      })
    });
    const json = await review.json();
    console.log(json);
  }
  const createVote = (e:FormEvent<HTMLInputElement>)=>
  {
    const value = (e.target as HTMLInputElement).value;
    console.log("create vote");
    console.log(value);
    setVote(value);
  }
  return (
    <ReviewFrame>
      <Error>{error}</Error>
       <SubTitle>Vote</SubTitle>
          <form>
            <input type="radio" name="vote" value="pass" onChange={createVote}/>
            <label>pass</label><br />
            <input type="radio" name="vote" value="no pass"  onChange={createVote}/>
            <label>no pass</label><br />
            <input type="radio" name="vote" value="recommend to gallery"  onChange={createVote}/>
            <label>recommend to gallery</label>
          </form>
      <SubTitle>Comment</SubTitle>
      <Comment ref={commentRef} contentEditable></Comment>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <FilledButton onClick={(createReview)}>Submit</FilledButton>
        <FilledButton style={{width:"20rem"}} onClick={improveFeedback}>Improve this feedback</FilledButton>
      </div>
      {improvement==="Loading..." && <Loader>Loading...</Loader>} {improvement? <Tip>{improvement}</Tip> : null}
    </ReviewFrame>
  )
}


export default ReviewComment;