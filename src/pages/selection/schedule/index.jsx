import React from 'react';
import Map from 'components/Map';
import SectionHeader from 'components/SectionHeader';
import dummyHeader from 'constants/dummyData/pages.json';

const Schedule = () => {
  return (
    <div className="container">
      <div className="row">
        <SectionHeader
          title={dummyHeader[2].title}
          subtitle={dummyHeader[2].subtitle}
          level='2'
          description={dummyHeader[2].description}
        />
        <Map />
      </div>
    </div>
  );
};

export default Schedule;
