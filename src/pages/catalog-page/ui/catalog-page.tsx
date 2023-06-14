import { Breadcrumbs } from '../../../shared/ui/breadcrumbs';
import { Banner } from '../../../wigets/banner';
import { Catalog } from '../../../wigets/catalog';
import { Layout } from '../../../wigets/layout';

const CatalogPage = (): JSX.Element => (
  <Layout>
    <main>
      <Banner />

      <div className="page-content">
        <Breadcrumbs />

        <Catalog />
      </div>
    </main>
  </Layout>
);

export default CatalogPage;
