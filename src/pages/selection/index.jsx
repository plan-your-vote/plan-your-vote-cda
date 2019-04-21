import React from 'react';
import { Route } from 'react-router-dom';

import * as routes from 'constants/routes';

import Navigation from './nav';
import Candidates from './candidates';
import Capital from './capital';
import Schedule from './schedule';
import Review from './review';

const SelectionPage = () => {
  return (
    <>
      SelectionPage
      <Navigation />
      <Route path={routes.CANDIDATES} component={() => <Candidates />} />
      <Route path={routes.CAPITAL} component={() => <Capital />} />
      <Route path={routes.SCHEDULE} component={() => <Schedule />} />
      <Route path={routes.REVIEW} component={() => <Review />} />
    </>
  );
};

export default SelectionPage;
