
export type AggregatedGuide = {
  _id: string;
  title: string;
  description: string;
  module: {
    title: string;
    description: string;
  };
  isReturned: boolean;
  isReviewed: boolean;
  gotReviews: boolean;
  grade: number;
}