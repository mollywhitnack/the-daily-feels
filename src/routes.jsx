import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import SplashPage from './components/splash/SplashPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SplashPage} />
    <Route path="splash" component={SplashPage} />
  </Route>
);

