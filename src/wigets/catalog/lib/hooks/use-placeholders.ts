import { useEffect } from 'react';

import { RatedCamera } from '../../../../entities/camera';
import { CurrentPrice } from '../types/current-price';

export const usePlaceholders = (
  catalog: RatedCamera[],
  setPlaceholder: React.Dispatch<React.SetStateAction<CurrentPrice>>
) => {
  useEffect(() => {
    if (catalog.length) {
      const sorted = [...catalog].sort((a, b) => a.price - b.price);

      setPlaceholder({
        min: sorted[0].price,
        max: sorted[sorted.length - 1].price,
      });
    }
  }, [catalog.length]);
};
