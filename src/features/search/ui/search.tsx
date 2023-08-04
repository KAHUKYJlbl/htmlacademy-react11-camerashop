import { ChangeEvent, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { Link, generatePath } from 'react-router-dom';
import cn from 'classnames';

import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { getSearch } from '../model/search-selectors';
import { AppRoute } from '../../../app/provider/router';
import { handleNavigationKeys } from '../lib/handleNavigationKeys';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { fetchCatalog, getCatalog, getCatalogLoadingStatus } from '../../../wigets/catalog';

export function Search (): JSX.Element {
  const listItemRef = useRef( new Array<HTMLAnchorElement | null>() );
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [currentSearchItemID, setCurrentSearchItemID] = useState<number | null>(null);
  const catalog = useAppSelector(getCatalog);
  const catalogLoadingStatus = useAppSelector(getCatalogLoadingStatus);
  const searchList = useAppSelector((state) => getSearch(state, searchInput));

  useEffect(() => {
    if (!catalog.length) {
      dispatch(fetchCatalog());
    }
  }, []);

  const onNavKeysDown: KeyboardEventHandler<HTMLAnchorElement> = (e) => {
    const navKeys = [
      'ArrowDown',
      'ArrowUp',
    ];

    if (navKeys.includes(e.key) && searchInput) {
      e.preventDefault();
      e.stopPropagation();
    }

    handleNavigationKeys({
      e,
      list: searchList,
      listItemRef,
      current: currentSearchItemID,
    });
  };

  return (
    <div
      className={cn(
        'form-search',
        {'list-opened': searchList.length && searchInput.length}
      )}
    >
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>

          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchInput}
            onChange={( e: ChangeEvent<HTMLInputElement> ) => setSearchInput(e.target.value)}
            disabled={catalogLoadingStatus.isLoading || catalogLoadingStatus.isFailed}
          />
        </label>

        <ul className="form-search__select-list" tabIndex={-1}>
          {
            searchList.map((camera) => (
              <li
                key={camera.id}
                className={cn(
                  'form-search__select-item',
                  {'current': camera.id === currentSearchItemID}
                )}
              >
                <Link
                  ref={(element) => listItemRef.current.push(element)}
                  id={String(camera.id)}
                  to={generatePath( AppRoute.Camera, { cameraId: String(camera.id) } )}
                  style={{outline: 'none', width: '100%', height: '100%'}}
                  onFocus={() => setCurrentSearchItemID(camera.id)}
                  onBlur={() => setCurrentSearchItemID(null)}
                  onKeyDown={onNavKeysDown}
                  onMouseEnter={() => setCurrentSearchItemID(camera.id)}
                  onMouseLeave={() => setCurrentSearchItemID(null)}
                  onClick={() => {
                    setSearchInput('');
                    setCurrentSearchItemID(null);
                  }}
                >
                  {camera.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </form>

      <button
        className="form-search__reset"
        type="reset"
        onClick={() => {
          setSearchInput('');
          setCurrentSearchItemID(null);
        }}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>

        <span className="visually-hidden">
          Сбросить поиск
        </span>
      </button>
    </div>
  );
}
