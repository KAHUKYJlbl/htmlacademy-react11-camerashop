import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { toast } from 'react-toastify';
import { APIRoute } from '../../../../shared/lib/const/api-routes';
import { ReviewType } from '../../../../entities/review';
import { generatePath } from 'react-router-dom';

export const fetchReviews = createAsyncThunk<ReviewType[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'REview/fetchReviews',
  async (cameraId, {extra: axios}) => {
    try {
      const { data } = await axios.get<ReviewType[]>(generatePath(APIRoute.Review, {cameraId}));

      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Catalog loading failed.');
      }
      throw err;
    }
  },
);
