import React, { Component } from 'react';
import Table from 'components/Table';
import SectionHeader from 'components/SectionHeader';
import dummyCandidates from 'constants/dummyData/candidates.json';
import dummyHeader from 'constants/dummyData/pages.json';

class Candidates extends Component {

  render() {
    return (
      <>
        <SectionHeader
          title={dummyHeader[0].title}
          subtitle={dummyHeader[0].subtitle}
          level='1'
          description={dummyHeader[0].description}
        />
        <Table head={dummyCandidates.head} body={dummyCandidates.body} />

      </>
    );
  }
}

export default Candidates;
