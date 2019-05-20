import React from 'react';

const CandidateSectionHeader = ({ pollDetails }) => {
  if (!pollDetails) {
    return null;
  }

  let location = pollDetails[0].address;
  let votingDay = pollDetails[0].pollingPlaceDates[0].pollingDate.substring(10, 0);

  return (
    <>
      <p>{location}</p>
      <p>{votingDay}</p>
    </>
  );
};

export default CandidateSectionHeader;
