import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as routes from 'constants/routes';

import Navigation from './nav';
import Candidates from './candidates';
import Capital from './capital';
import Schedule from './schedule';
import Review from './review';

const SelectionPage = () => {
  return (
    <div className="container plan-step">
      <div className="step-selection">
        <Navigation />
      </div>

      <div className="divider"></div>
      
      <Switch>
        <Route path={routes.CANDIDATES} component={() => <Candidates />} />
        <Route path={routes.CAPITAL} component={() => <Capital />} />
        <Route path={routes.SCHEDULE} component={() => <Schedule />} />
        <Route path={routes.REVIEW} component={() => <Review />} />
        <Route render={() => <Candidates />} />
      </Switch>
    </div>
  );
};

export default SelectionPage;
