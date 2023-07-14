import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';

import { CameraRating } from '../../../../entities/camera';
import { AppDispatch, State } from '../../../../app/provider/store';
import { toast } from 'react-toastify';
import { APIRoute } from '../../../../shared/lib/const/api-routes';
import { Review } from '../../../../entities/review';
import { generatePath } from 'react-router-dom';

export const fetchRating = createAsyncThunk<CameraRating, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Similar/fetchRating',
  async (cameraId, {extra: axios}) => {
    try {
      const { data } = await axios.get<Review[]>(generatePath(APIRoute.Review, {cameraId}));

      return {
        id: data[0].cameraId,
        rating: Math.ceil(data.reduce((rating, review) =>
          rating + review.rating
        , 0) / data.length)
      };
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Rating loading failed.');
      }
      throw err;
    }
  },
);
