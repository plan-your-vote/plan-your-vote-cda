import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation';
import FrontPage from '../FrontPage';
import Footer from '../Footer';
import * as routes from '../../constants/routes';
import SelectionPage from '../SelectionPage';

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
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </Router>
        <Footer />
      </>
    );
  }
}

export default App;
