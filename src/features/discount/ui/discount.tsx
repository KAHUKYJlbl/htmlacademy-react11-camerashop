import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import cn from 'classnames';
import { toast } from 'react-toastify';

import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { FetchStatus } from '../../../shared/types/fetch-status';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';

import { getCheckDiscountLoadingStatus, getDiscountStatus } from '../model/discount-selectors';
import { checkDiscount } from '../model/api-actions/check-discount';
import { setCoupon, setDiscountStatus } from '../model/discount-slice';
import { DiscountForm } from '../lib/types/discount-form';

export const Discount = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue } = useForm<DiscountForm>();
  const [ fieldErrors, setFieldErrors ] = useState({coupon: false});
  const discountStatus = useAppSelector(getDiscountStatus);
  const discountLoadingStatus = useAppSelector(getCheckDiscountLoadingStatus);

  const onFormSubmit: SubmitHandler<DiscountForm> = (data) => {
    dispatch(checkDiscount(data))
      .then(() => {
        dispatch(setCoupon(data.coupon));
        setValue('coupon', '');
      });
    setFieldErrors({coupon: false});
  };

  const onFormSubmitError: SubmitErrorHandler<DiscountForm> = (errors) => {
    setFieldErrors({
      coupon: !!errors.coupon,
    });
    toast.error(errors.coupon?.message);
    dispatch(setDiscountStatus(FetchStatus.Idle));
  };


  return (
    <div className="basket__promo">
      <p className="title title--h4">
        Если у вас есть промокод на скидку, примените его в этом поле
      </p>

      <div className="basket-form">
        <form onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)}>
          <fieldset disabled={discountLoadingStatus.isLoading}>
            <div
              className={cn(
                'custom-input',
                {
                  'is-invalid': discountStatus.isDenied,
                  'is-valid': discountStatus.isAccepted,
                }
              )}
            >
              <label>
                <span className="custom-input__label">
                  Промокод

                  {
                    fieldErrors.coupon &&
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  }
                </span>

                <input
                  type="text"
                  placeholder="Введите промокод"
                  {...register('coupon', {
                    required: 'Введите промокод',
                    pattern: {
                      value: /^\S*$/gm,
                      message: 'Введите промокод без пробела'
                    }
                  })}
                />
              </label>

              <p className="custom-input__error">
                Промокод неверный
              </p>

              <p className="custom-input__success">
                Промокод принят!
              </p>
            </div>

            <button
              className="btn"
              type="submit"
            >
              Применить
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
