import React from 'react';
import { Route } from 'react-router-dom';

import SelectionNavitation from '../SelectionNavigation';
import Candidates from '../Candidates';
import Capital from '../Capital';
import Schedule from '../Schedule';
import Review from '../Review';

import * as routes from '../../constants/routes';

const SelectionPage = () => {
  return (
    <div>
      SelectionPage
      <SelectionNavitation />
      <Route path={routes.CANDIDATES} component={() => <Candidates />} />
      <Route path={routes.CAPITAL} component={() => <Capital />} />
      <Route path={routes.SCHEDULE} component={() => <Schedule />} />
      <Route path={routes.REVIEW} component={() => <Review />} />
    </div>
  );
};

export default SelectionPage;
