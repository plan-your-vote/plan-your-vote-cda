import React from 'react';
import Email from 'components/Email';
import ICS from 'components/ICS';
import SectionHeader from 'components/SectionHeader';
import dummyHeader from 'constants/dummyData/pages.json';

const Review = () => {
  return (
    <>
      <SectionHeader
        title={dummyHeader[3].title}
        subtitle={dummyHeader[3].subtitle}
        level='1'
        description={dummyHeader[3].description}
      />
      <Email />
      <ICS />
    </>
  );
};

export default Review;
