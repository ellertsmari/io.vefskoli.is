'use client'
import {MouseEvent, useRef, useState} from 'react';
import styled from 'styled-components';
import { FilledButton } from '../buttons/filledButton';
import { Comment, SubTitle, ReviewFrame, Loader, Tip } from '@/styles/pageStyles/review.styles';

const ReviewComment = () => {
  const [improvement, setImprovement] = useState<string>("");
  const improveFeedback = async (e:MouseEvent) => {
    setImprovement("Loading...");
    const improvedFeedback = await fetch(`/api/improveFeedback?feedback=${commentRef.current?.innerText}`);
    const json = await improvedFeedback.json();
    console.log("improve feedback", json);
    setImprovement(json.message.content);
  }
  const commentRef = useRef<HTMLDivElement>(null);
  return (
    <ReviewFrame>
      <SubTitle>Comment</SubTitle>
      <Comment ref={commentRef} contentEditable></Comment>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <FilledButton>Submit</FilledButton>
        <FilledButton style={{width:"20rem"}} onClick={improveFeedback}>Improve this feedback</FilledButton>
      </div>
      {improvement==="Loading..." ? <Loader>Loading...</Loader> : <Tip>{improvement}</Tip>}
    </ReviewFrame>
  )
}


export default ReviewComment;