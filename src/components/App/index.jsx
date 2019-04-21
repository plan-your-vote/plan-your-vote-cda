import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as routes from 'constants/routes';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';

import Home from 'pages/home';
import Selection from 'pages/selection';
import TermsOfUse from 'pages/terms-of-use';
import PrivacyPolicy from 'pages/privacy-policy';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navigation />
          <Switch>
            <Route
              exact
              path={routes.HOME}
              component={() => <Home />}
            />
            <Route
              path={routes.SELECTION}
              component={() => <Selection />}
            />
            <Route
              path={routes.TERMS_OF_USE}
              component={() => <TermsOfUse />}
            />
            <Route
              path={routes.PRIVACY_POLICY}
              component={() => <PrivacyPolicy />}
            />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
