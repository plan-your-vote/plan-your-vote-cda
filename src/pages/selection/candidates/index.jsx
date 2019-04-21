import React from 'react';
import Table from 'components/Table';
import dummydata from 'constants/dummyData/candidates.json';

const Candidates = () => {
  return (
    <>
      Candidates
      <Table head={dummydata.head} body={dummydata.body} />
    </>
  );
};

export default Candidates;
