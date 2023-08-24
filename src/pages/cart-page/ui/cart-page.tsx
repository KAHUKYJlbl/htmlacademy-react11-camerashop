import { RemoveCart, getRemoveCartShown } from '../../../features/add-cart';
import { OrderSuccess, getOrderSuccessShown } from '../../../features/post-order';
import { Titles } from '../../../shared/lib/const/titles';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { Breadcrumbs } from '../../../shared/ui/breadcrumbs';
import { CartList, CartSummary } from '../../../wigets/cart';
import { Layout } from '../../../wigets/layout';

const CartPage = (): JSX.Element => {
  const isRemoveCartShown = useAppSelector(getRemoveCartShown);
  const isOrderSuccessShown = useAppSelector(getOrderSuccessShown);

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

        {isRemoveCartShown && <RemoveCart />}
        {isOrderSuccessShown && <OrderSuccess />}
      </main>
    </Layout>
  );
};

export default CartPage;
