import { GuideType } from "@/models/guide";
import { ReturnType } from "@/models/return";
import { UserWithIdType } from "@/models/user";
import { ReviewType } from "@/models/review";

type ReviewWithId = ReviewType & { _id: string };
type ReturnWithId = ReturnType & { _id: string };

export type AggregatedGuide = {
  _id: string;
  title: string;
  description: string;
  userReturns: ReturnWithId[];
  module: {
    title: string;
    description: string;
  };
  oldestReturnId: string;
  category: string;
  isReturned: boolean;
  isReviewed: boolean;
  userReviews: ReviewType[];
  otherReviews: ReviewWithId[];
  guide: GuideType;
  returnDate: Date;
  order: number;
}
/* this is some crazy stuff from Chat GPT what works well but I don't need to use it after all
type DeepOmit<T, K extends string | number | symbol> = T extends object
  ? {
      [Key in keyof T]: Key extends K ? never : DeepOmit<T[Key], K>;
    }
  : T;
*/

export type OmitPassword = Omit<UserWithIdType, 'password'> & {password?:string};

