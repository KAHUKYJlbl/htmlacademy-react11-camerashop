import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { toast } from 'react-toastify';
import { APIRoute } from '../../../../shared/lib/const/api-routes';
import { BannerCamera } from '../../../../entities/camera';

export const fetchBanner = createAsyncThunk<BannerCamera, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Banner/fetchCBanner',
  async (_arg, {extra: axios}) => {
    try {
      const { data } = await axios.get<BannerCamera>(APIRoute.Banner);

      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Banner loading failed.');
      }
      throw err;
    }
  },
);
