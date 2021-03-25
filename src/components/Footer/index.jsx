import React from 'react';
import './index.css';

const socialIcon = (id, className, link) => {
  return (
      <li id={id} className='fa-stack'>

        <i className='fas fa-circle fa-stack-2x' />
        <a href={link}>
          <i className={`fab ${className} fa-stack-1x fa-inverse`} />
        </a>
      </li>
  );
};

const Footer = ({ logo, socialMedia }) => {
  return (
    <footer>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <img id='footer-logo' src={logo.value} alt={logo.description} />
            <div id='footer-copyright'>&copy; 2019 Vancouver</div>
            <ul id='footer-nav'>
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
            <ul id='footer-share'>
              {socialMedia.map((media, i) => {
                let name = media.mediaName.toLowerCase();
                let iconClass = name;
                if (iconClass === 'facebook') {
                  iconClass = iconClass+'-f';
                }
                if (iconClass === 'linkedin') {
                  iconClass = iconClass+'-in';
                }
                return socialIcon(name, 'fa-' + iconClass, media.link)
              })}
            </ul>
            <select
              aria-label='Change language to: '
              className='custom-select custom-select-sm'
            >
              <option value='0'>en</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
