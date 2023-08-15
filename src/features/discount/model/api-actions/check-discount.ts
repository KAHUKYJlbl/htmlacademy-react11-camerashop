import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { toast } from 'react-toastify';
import { APIRoute } from '../../../../shared/lib/const/api-routes';
import { DiscountForm } from '../../lib/types/discount-form';

export const checkDiscount = createAsyncThunk<string, DiscountForm, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Discount/checkDiscount',
  async (coupon, {extra: axios}) => {
    try {
      const { data } = await axios.post<string>(
        APIRoute.CheckDiscount,
        coupon
      );

      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 400) {
        return '0';
      }

      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Coupon checking failed.');
      }
      throw err;
    }
  },
);
