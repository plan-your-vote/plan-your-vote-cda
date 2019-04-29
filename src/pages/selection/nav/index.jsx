import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from 'constants/routes';

const SelectionNavitation = () => {
  return (
    <div className="navbar navbar-expand subnavbar">
      <Link to={routes.CANDIDATES} className="nav-link nav-item">Candidates</Link>
      <Link to={routes.CAPITAL} className="nav-link nav-item">Capital</Link>
      <Link to={routes.SCHEDULE} className="nav-link nav-item">Schedule</Link>
      <Link to={routes.REVIEW} className="nav-link nav-item">Review</Link>
    </div>
  );
};

export default SelectionNavitation;
