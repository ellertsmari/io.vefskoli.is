import { GuideType } from "@/models/guide";
import { ReturnType } from "@/models/return";
import { UserWithIdType } from "@/models/user";
import { ReviewType } from "@/models/review";

type ReviewWithId = ReviewType & { _id: string };

export type AggregatedGuide = {
  _id: string;
  title: string;
  description: string;
  userReturns: ReturnType[];
  module: {
    title: string;
    description: string;
  };
  oldestReturnId: string;
  isReturned: boolean;
  isReviewed: boolean;
  userReviews: ReviewType[];
  otherReviews: ReviewWithId[];
  guide: GuideType;
  returnDate: Date;
}

export type OmitPassword = Omit<UserWithIdType, 'password'> & {password?:string};