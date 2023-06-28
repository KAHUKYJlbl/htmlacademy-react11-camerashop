export type ReviewForm = {
  rating: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
}

export type ReviewFormAPI = Omit<ReviewForm, 'rating'> & {
  cameraId: number;
  rating: number;
}

export type Review = ReviewFormAPI & {
  id: string;
  createAt: string;
}
