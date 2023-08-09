import { Titles } from '../../../shared/lib/const/titles';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { Breadcrumbs } from '../../../shared/ui/breadcrumbs';
import { CartList, CartSummary } from '../../../wigets/cart';
import { Layout } from '../../../wigets/layout';

const CartPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <Layout title={Titles.Cart} isScrollRestoration >
      <main>
        <div className="page-content">
          <Breadcrumbs title={Titles.Cart} />

          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">
                Корзина
              </h1>

              <CartList />

              <CartSummary />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default CartPage;
