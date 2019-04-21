import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';

const Navigation = () => (
  <nav>
    <Link to='/'>Home</Link>
    <Link to={routes.SELECTION}>Start Planning</Link>
  </nav>
);

export default Navigation;
