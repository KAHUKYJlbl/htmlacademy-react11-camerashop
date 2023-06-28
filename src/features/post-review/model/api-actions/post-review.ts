import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { toast } from 'react-toastify';
import { APIRoute } from '../../../../shared/lib/const/api-routes';
import { Review, ReviewFormAPI } from '../../../../entities/review';
import { generatePath } from 'react-router-dom';

export const postReview = createAsyncThunk<Review, ReviewFormAPI, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Review/postReview',
  async (newReview, {extra: axios}) => {
    try {
      const { data } = await axios.post<Review>(
        generatePath( APIRoute.PostReview, { cameraId: String(newReview.cameraId) } ),
        newReview
      );

      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Catalog loading failed.');
      }
      throw err;
    }
  },
);
