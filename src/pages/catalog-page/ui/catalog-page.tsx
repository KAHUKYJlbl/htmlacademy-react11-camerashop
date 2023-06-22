import { AddBasket, getAddBasketShown } from '../../../features/add-basket';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { Breadcrumbs } from '../../../shared/ui/breadcrumbs';
import { Banner } from '../../../wigets/banner';
import { Catalog } from '../../../wigets/catalog';
import { Layout } from '../../../wigets/layout';

const CatalogPage = (): JSX.Element => {
  const isAddBasketShown = useAppSelector(getAddBasketShown);

  return (
    <Layout>
      <main>
        <Banner />

        <div className="page-content">
          <Breadcrumbs />

          <Catalog />
        </div>

        {isAddBasketShown && <AddBasket />}
      </main>
    </Layout>
  );
};


export default CatalogPage;
