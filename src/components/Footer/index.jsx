import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

const Footer = () => {
  return (
    <footer>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <img alt='Logo' />
            <div>&copy; 2019 Vancouver</div>
            <ul>
              <li>
                <Link to={routes.TERMS_OF_USE}>
                  Terms of Use
                  <span>(opens in a new window)</span>
                </Link>
              </li>
              <li>
                <Link to={routes.PRIVACY_POLICY}>
                  Privacy Policy
                  <span>(opens in a new window)</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-md-6'>
            <ul>
              <li>Twitter</li>
              <li>Facebook </li>
              <li>LinkedIn</li>
            </ul>
            <select aria-label='Change language to: ' />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
