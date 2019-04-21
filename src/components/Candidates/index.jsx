import React from 'react';
import Table from '../Table';
import dummydata from '../../constants/dummyData/candidates.json';

const Candidates = () => {
  return (
    <div>
      Candidates
      <Table head={dummydata.head} body={dummydata.body} />
    </div>
  );
};

export default Candidates;
