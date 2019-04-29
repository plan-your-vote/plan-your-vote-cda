import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from 'constants/routes';

const Navigation = ({ logo }) => {
  return (
    <nav className='navbar navbar-expand-md navbar-light border-bottom bg-white shadow-sm mb-4'>
      <div className="container">
        <Link to={routes.HOME}>
          <img
            className="navbar-brand"
            id='nav-logo'
            src={logo.value}
            alt={logo.description} />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarCollapse'
          aria-controls='navbarCollapse'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse d-md-inline-flex flex-md-row-reverse' id='navbarCollapse'>
          <ul className='navbar-nav flex-grow'>
            <li className='nav-item active'>
              <Link
                to={routes.HOME}
                aria-label='Home: Link to main page.'
                className="nav-link text-dark">
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to={routes.SELECTION}
                aria-label='Start Voting: link to step 1 of planning your vote. Reminder: This is a planning application, actual voting must be done in person on election day.'
                className="nav-link text-dark"
              >
                Start Planning
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
