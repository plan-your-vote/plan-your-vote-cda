import React from 'react';
import Table from 'components/Table';
import SectionHeader from 'components/SectionHeader';
import dummyCandidates from 'constants/dummyData/candidates.json';
import dummyHeader from 'constants/dummyData/pages.json';

const Candidates = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <SectionHeader
            title={dummyHeader[0].title}
            subtitle={dummyHeader[0].subtitle}
            level='2'
            description={dummyHeader[0].description}
          />
          <Table head={dummyCandidates.head} body={dummyCandidates.body} />
        </div>
      </div>
    </>
  );
};

export default Candidates;
