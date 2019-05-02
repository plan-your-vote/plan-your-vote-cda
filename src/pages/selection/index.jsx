import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as routes from 'constants/routes';

import Navigation from './nav';
import Candidates from './candidates';
import Capital from './capital';
import Schedule from './schedule';
import Review from './review';

const SelectionPage = ({ handleTest }) => {
  return (
    <>
      <Navigation handleTest={handleTest} />
      <Switch>
        <Route
          path={routes.CANDIDATES}
          component={({ handleTest }) => <Candidates />}
        />
        <Route
          path={routes.CAPITAL}
          component={({ handleTest }) => <Capital />}
        />
        <Route
          path={routes.SCHEDULE}
          component={({ handleTest }) => <Schedule />}
        />
        <Route
          path={routes.REVIEW}
          component={({ handleTest }) => <Review />}
        />
        <Route render={() => <Candidates />} />
      </Switch>
    </>
  );
};

export default SelectionPage;
