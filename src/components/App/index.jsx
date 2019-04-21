import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation';
import FrontPage from '../FrontPage';
import Footer from '../Footer';
import * as routes from '../../constants/routes';
import SelectionPage from '../SelectionPage';
import TermsOfUse from '../../pages/terms-of-use';
import PrivacyPolicy from '../../pages/privacy-policy';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navigation />
          <Switch>
            <Route
              exact
              path={routes.FRONTPAGE}
              component={() => <FrontPage />}
            />
            <Route
              path={routes.SELECTION}
              component={() => <SelectionPage />}
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
