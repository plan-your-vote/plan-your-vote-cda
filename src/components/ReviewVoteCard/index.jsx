import React from 'react';

const CandidateSectionHeader = ({ pollDetails}) => {
  
  if(!pollDetails) {
    return null;
  }

  let location = pollDetails[0].address;
  let votingDay = ''

 

  const sentence = () => {
    for (let i =0; i < pollDetails[0].pollingPlaceDates.length; i++) {
        votingDay += (pollDetails[0].pollingPlaceDates[i].pollingDate).substring(10,0) + ', '
    }

    if (votingDay === '') {
        votingDay = 'N/A'
    }

    return votingDay
  }
  
  votingDay = votingDay.substring(10,0)

  return (
    <>
      <p>
        <span className ='pollPoints'>Address:</span> {location}
      </p>

      <p><span className='pollPoints'>Voting Days:</span> {sentence()}</p>
    </>
  );
};

export default CandidateSectionHeader;
