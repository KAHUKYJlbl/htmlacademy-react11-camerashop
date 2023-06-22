import { NameSpace, State } from '../../../app/provider/store';
import { Camera } from '../../../entities/camera';

export const getAddBasketShown = (state: State): boolean => state[NameSpace.AddBasket].isAddBasketShown;

export const getCurrentCamera = (state: State): Camera | null => state[NameSpace.AddBasket].currentCamera;
