import { Camera } from '../../../entities/camera';

type handleNavigationKeysProps = {
  e: React.KeyboardEvent<HTMLFormElement>;
  list: Camera[];
  listItemRef: React.MutableRefObject<(HTMLLIElement | null)[]>;
  setCurrent: React.Dispatch< React.SetStateAction <number | null> >;
}

export const handleNavigationKeys = ({e, list, listItemRef, setCurrent}: handleNavigationKeysProps) => {
  switch (e.key) {
    case 'Tab':
      setCurrent((val) => {
        if (val) {
          if (list.findIndex((camera) => camera.id === val) < list.length - 1) {
            listItemRef.current.find((element) =>
              element?.id === String(list[list.findIndex((camera) => camera.id === val) + 1].id))
              ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            return list[list.findIndex((camera) => camera.id === val) + 1].id;
          }

          return val;
        }

        return list[0].id;
      });

      break;
    case 'ArrowDown':
      setCurrent((val) => {
        if (val) {
          if (list.findIndex((camera) => camera.id === val) < list.length - 1) {
            listItemRef.current.find((element) =>
              element?.id === String(list[list.findIndex((camera) => camera.id === val) + 1].id))
              ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            return list[list.findIndex((camera) => camera.id === val) + 1].id;
          }

          listItemRef.current.find((element) =>
            element?.id === String(val))
            ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          return val;
        }

        listItemRef.current.find((element) =>
          element?.id === String(list[0].id))
          ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        return list[0].id;
      });

      break;
    case 'ArrowUp':
      setCurrent((val) => {
        if (val) {
          if (list.findIndex((camera) => camera.id === val) !== 0) {
            listItemRef.current.find((element) =>
              element?.id === String(list[list.findIndex((camera) => camera.id === val) - 1].id))
              ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            return list[list.findIndex((camera) => camera.id === val) - 1].id;
          }

          listItemRef.current.find((element) =>
            element?.id === String(val))
            ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          return val;
        }

        listItemRef.current.find((element) =>
          element?.id === String(list[list.length - 1].id))
          ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        return list[list.length - 1].id;
      });

      break;
  }
};
