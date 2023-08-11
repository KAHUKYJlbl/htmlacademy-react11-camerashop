import { AddCart, getAddCartShown } from '../../../features/add-cart';
import { Titles } from '../../../shared/lib/const/titles';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { Breadcrumbs } from '../../../shared/ui/breadcrumbs';
import { Banner } from '../../../wigets/banner';
import { Catalog } from '../../../wigets/catalog';
import { Layout } from '../../../wigets/layout';

const CatalogPage = (): JSX.Element => {
  const isAddCartShown = useAppSelector(getAddCartShown);

  return (
    <Layout title={Titles.Catalog} >
      <main>
        <Banner />

        <div className="page-content">
          <Breadcrumbs title={Titles.Catalog} />

          <Catalog />
        </div>

        {isAddCartShown && <AddCart />}
      </main>
    </Layout>
  );
};

export default CatalogPage;
