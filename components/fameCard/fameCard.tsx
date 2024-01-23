import { GuideType } from "@/models/guide";
import React from "react";
type Props = {
  guide: GuideType;
};
const FameCard = ({ guide }: Props) => {
  return (
    <>
      <h1>{guide.title}</h1>
      <div>{guide.description}</div>
    </>
  );
};

export default FameCard;
