import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from 'constants/routes';

const SelectionNavitation = ({handleTest}) => {

  return (
    <>
      <Link to={routes.CANDIDATES} onClick={handleTest}>Candidates</Link>
      <Link onClick={handleTest} to={routes.CAPITAL} >Capital</Link>
      <Link to={routes.SCHEDULE} onClick={handleTest}>Schedule</Link>
      <Link to={routes.REVIEW} onClick={handleTest}>Review</Link>
    </>
  );
};

export default SelectionNavitation;
