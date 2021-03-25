import React from 'react';

const CandidateSectionHeader = ({ candidatePosition, description, numberNeeded }) => {
  let instructions;
  let heading;

  heading = <>FOR THE ELECTION, YOU CAN VOTE FOR {numberNeeded} CANDIDATE</>;
  instructions = (
      <>
        {description}
      </>
    );

  return (
    <>
      <p>
        <span className='card-subtitle mb-2 text-muted'>{heading}</span>
      </p>
      <p>{instructions}</p>
    </>
  );
};

export default CandidateSectionHeader;
