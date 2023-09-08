import { GuideType } from "@/models/guide";
import { ReturnType } from "@/models/return";
import { UserWithIdType } from "@/models/user";

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
  gotReviews: boolean;
  grade: number;
  guide: GuideType;
}

export type OmitPassword = Omit<UserWithIdType, 'password'> & {password?:string};