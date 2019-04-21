import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div class='container'>
        <div class='row'>
          <div class='col-md-6'>
            <img alt='Logo' />
            <div>&copy; 2019 Vancouver</div>
            <ul>
              <li>
                <a href='#' target='_blank'>
                  Terms of Use
                  <span>(opens in a new window)</span>
                </a>
              </li>
              <li>
                <a href='#' target='_blank'>
                  Privacy Policy
                  <span>(opens in a new window)</span>
                </a>
              </li>
            </ul>
          </div>
          <div class='col-md-6'>
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
