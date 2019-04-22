import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as routes from 'constants/routes';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';

import Home from 'pages/home';
import Selection from 'pages/selection';

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
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
