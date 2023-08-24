import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { toast } from 'react-toastify';
import { APIRoute } from '../../../../shared/lib/const/api-routes';
import { OrderForm } from '../../../../wigets/cart/lib/types/order-form';

export const postOrder = createAsyncThunk<void, OrderForm, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Cart/postOrder',
  async (coupon, {extra: axios}) => {
    try {
      await axios.post(
        APIRoute.PostOrder,
        coupon
      );
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 400) {
        toast.error((err.response?.data as string[]).join('; '));
      }

      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Order posting failed.');
      }
      throw err;
    }
  },
);
