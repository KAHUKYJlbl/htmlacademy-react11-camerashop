import { Navigate, generatePath } from 'react-router-dom';

import { AppRoute } from '../../../app/provider/router';

const MainPage = (): JSX.Element => <Navigate to={generatePath( AppRoute.Catalog, {page: '1'} )} />;

export default MainPage;
