import { Helmet } from 'react-helmet';

import { SvgSprite } from '../../../shared/ui/svg-sprite';
import { UpHeader } from '../../../shared/ui/up-header';
import { Titles } from '../../../shared/lib/const/titles';
import { Camera } from '../../../entities/camera';
import Footer from './footer';
import Header from './header';
import { ScrollRestoration } from 'react-router-dom';

type LayoutProps = {
  children: JSX.Element;
  isUpHeader?: boolean;
  title: Titles;
  camera?: Camera | null;
}

export function Layout ({children, isUpHeader, title, camera}: LayoutProps): JSX.Element {
  return (
    <div className="wrapper">
      <Helmet>
        <title>{`${title}${camera?.name || ''} - Фотошоп`}</title>
      </Helmet>

      <SvgSprite />

      <Header />

      {children}

      {isUpHeader && <UpHeader />}

      <Footer />
      <ScrollRestoration />
    </div>
  );
}
