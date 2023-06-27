export type Review = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: FiveScaleRating;
}

type FiveScaleRating = 1 | 2 | 3 | 4 | 5
