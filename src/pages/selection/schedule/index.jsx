import React from 'react';
import Map from 'components/Map';
import SectionHeader from 'components/SectionHeader';
import dummyHeader from 'constants/dummyData/pages.json';

const Schedule = () => {
  return (
    <>
      <SectionHeader
        title={dummyHeader[2].title}
        subtitle={dummyHeader[2].subtitle}
        level='1'
        description={dummyHeader[2].description}
      />
      <Map />
    </>
  );
};

export default Schedule;
