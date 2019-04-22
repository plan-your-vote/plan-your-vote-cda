import React from 'react';

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
                <a href='https://vancouver.ca/your-government/terms-of-use.aspx'>
                  Terms of Use
                </a>
              </li>
              <li>
                <a href='https://vancouver.ca/your-government/privacy-policy.aspx'>
                  Privacy Policy
                </a>
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
