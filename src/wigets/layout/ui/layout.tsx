import Footer from './footer';
import Header from './header';

type LayoutProps = {
  children: JSX.Element;
}

export function Layout ({children}: LayoutProps): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
