import { CameraCard } from '../../../entities/camera';
import { CatalogFilter } from '../../../features/catalog-filter';
import { CatalogSort } from '../../../features/catalog-sort';
import { Pagination } from '../../../shared/ui/pagination';

export function Catalog (): JSX.Element {
  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">
          Каталог фото- и видеотехники
        </h1>

        <div className="page-content__columns">
          <div className="catalog__aside">
            <CatalogFilter />
          </div>

          <div className="catalog__content">
            <CatalogSort />

            <div className="cards catalog__cards">
              <CameraCard />
              <CameraCard />
              <CameraCard />
              <CameraCard />
              <CameraCard />
              <CameraCard />
              <CameraCard />
              <CameraCard />
              <CameraCard />
            </div>

            <Pagination />
          </div>
        </div>
      </div>
    </section>
  );
}
