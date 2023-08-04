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
      listItemRef.current
        .find((element) =>
          element?.id === String((
            list[ list.findIndex( (camera) => camera.id === current ) + 1 ]
            || list[ list.findIndex( (camera) => camera.id === current ) ]
          ).id)
        )
        ?.focus();

      break;
    case 'ArrowUp':
      listItemRef.current
        .find((element) =>
          element?.id === String((
            list[ list.findIndex((camera) => camera.id === current) - 1 ]
            || list[ list.findIndex((camera) => camera.id === current) ]
          ).id)
        )
        ?.focus();

      break;
  }
};
