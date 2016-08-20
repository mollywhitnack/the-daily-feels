import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import SplashPage from './components/splash/SplashPage';
import ContentPage from './components/content/ContentPage';
import AboutPage from './components/about/AboutPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SplashPage} />
    <Route path="splash" component={SplashPage} />
    <Route path="articles" component={ContentPage} />
    <Route path="articles/:search" component={ContentPage} />
    <Route path="articles/:search/:emotion" component={ContentPage} />
    <Route path="about" component={AboutPage} />
  </Route>
);
