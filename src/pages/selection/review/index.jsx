import React from 'react';
import Email from 'components/Email';
import ICS from 'components/ICS';
import SectionHeader from 'components/SectionHeader';
import dummyHeader from 'constants/dummyData/pages.json';

const Review = () => {
  return (
    <div className="container">
      <div className="row">
        <SectionHeader
          title={dummyHeader[3].title}
          subtitle={dummyHeader[3].subtitle}
          level='2'
          description={dummyHeader[3].description}
        />
      </div>
      <div className="row">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <Email />
          <ICS />
        </div>
      </div>
    </div>
  );
};

export default Review;
