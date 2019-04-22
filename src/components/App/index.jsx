import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import pyv from 'utils/api/pyv';
import * as routes from 'constants/routes';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';

import Home from 'pages/home';
import Selection from 'pages/selection';

class App extends Component {
  state = {
    themeName: null,
    images: [
      {
        id: '',
        type: '',
        value: '',
        description: '',
        format: ''
      }
    ]
  };

  componentDidMount() {
    this.loadApiData();
  }

  loadApiData = async () => {
    const response = await pyv.get('/theme');
    const data = response.data;

    this.setState({
      themeName: data.selectedTheme.themeName,
      images: data.images
    });
  };

  render() {
    return (
      <>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path={routes.HOME} component={() => <Home />} />
            <Route path={routes.SELECTION} component={() => <Selection />} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
