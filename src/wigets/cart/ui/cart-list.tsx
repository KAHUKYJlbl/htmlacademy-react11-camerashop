import { CameraCardCart } from '../../../entities/camera';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';

export const CartList = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <ul className="basket__list">
      <CameraCardCart />
    </ul>
  );
};
