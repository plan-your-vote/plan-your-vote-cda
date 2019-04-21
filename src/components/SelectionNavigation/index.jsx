import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';


const SelectionNavitation = () => {
  return (
    <>
      <Link to={routes.CANDIDATES}>Candidates</Link>
      <Link to={routes.CAPITAL}>Capital</Link>
      <Link to={routes.SCHEDULE}>Schedule</Link>
      <Link to={routes.REVIEW}>Review</Link>
    </>
  );
};

export default SelectionNavitation;
