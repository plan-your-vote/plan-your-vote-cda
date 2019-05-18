import React from 'react';
import Email from 'components/Email';
import ICS from 'components/ICS';
import SectionHeader from 'components/SectionHeader';
import dummyHeader from 'constants/dummyData/pages.json';
import { Link } from 'react-router-dom';
import * as routes from 'constants/routes';

const Review = () => {
  return (
    <div className='container'>
      <div className='row'>
        <SectionHeader
          title={dummyHeader[3].title}
          subtitle={dummyHeader[3].subtitle}
          level='2'
          description={dummyHeader[3].description}
        />
      </div>
      <div className='row'>
        <div className='col-md-6' />
        <div className='col-md-6'>
          <Email />
          <ICS />
        </div>
      </div>
      <Link to={routes.SCHEDULE} className='btn btn-secondary  backBtn'>
        BACK
      </Link>
    </div>
  );
};

export default Review;
