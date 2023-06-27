import { NameSpace, State } from '../../../app/provider/store';
// import { Camera } from '../../../entities/camera';

export const getAddReviewShown = (state: State): boolean => state[NameSpace.AddReview].isAddReviewShown;

// export const getCurrentCamera = (state: State): Camera | null => state[NameSpace.AddBasket].currentCamera;
