import React from 'react';

const CandidateSectionHeader = ({ pollDetails}) => {
  
  if(!pollDetails) {
    return null;
  }

  console.log(pollDetails)
  let location = pollDetails[0].address;
  let votingDay = ''
  let pollType;

  votingDay = pollDetails[0].pollingPlaceDates[0].pollingDate

  votingDay = votingDay.substring(10,0)

  return (
    <>
      <p>{location}</p>
      
      <p>{votingDay}</p>
    </>
  );
};

export default CandidateSectionHeader;
