import { UpHeader } from '../../../shared/ui/up-header';
import Footer from './footer';
import Header from './header';

type LayoutProps = {
  children: JSX.Element;
  isUpHeader?: boolean;
}

export function Layout ({children, isUpHeader}: LayoutProps): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      {children}
      {isUpHeader && <UpHeader />}
      <Footer />
    </div>
  );
}
