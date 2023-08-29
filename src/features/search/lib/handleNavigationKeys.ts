import { Camera } from '../../../entities/camera';

type handleNavigationKeysProps = {
  e: React.KeyboardEvent<HTMLAnchorElement>;
  list: Camera[];
  listItemRef: React.MutableRefObject<(HTMLAnchorElement | null)[]>;
  current: number | null;
}

export const handleNavigationKeys = ({e, list, listItemRef, current}: handleNavigationKeysProps) => {
  switch (e.key) {
    case 'ArrowDown':
      if (current) {
        listItemRef.current
          .find((element) =>
            element?.id === String((
              list[ list.findIndex( (camera) => camera.id === current ) + 1 ]
              || list[ list.findIndex( (camera) => camera.id === current ) ]
            ).id)
          )
          ?.focus();
      } else {
        listItemRef.current[0]?.focus();
      }

      break;
    case 'ArrowUp':
      if (current) {
        listItemRef.current
          .find((element) =>
            element?.id === String((
              list[ list.findIndex((camera) => camera.id === current) - 1 ]
              || list[ list.findIndex((camera) => camera.id === current) ]
            ).id)
          )
          ?.focus();
      } else {
        listItemRef.current[listItemRef.current.length - 1]?.focus();
      }

      break;
  }
};
