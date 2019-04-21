import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import FrontPage from '../FrontPage';
import Footer from '../Footer';
import * as routes from '../../constants/routes';

class App extends Component {
  render() {
    return (
      <>
      <Router>
        <Navigation />
        <Route exact path={routes.FRONTPAGE} component={() => <FrontPage />} />
      </Router>
      <Footer />
      </>
    );
  }
}

export default App;
