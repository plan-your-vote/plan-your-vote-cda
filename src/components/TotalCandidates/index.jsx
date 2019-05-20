import React from 'react';

const CandidatesTally = ({ candidateJSON, positions }) => {
  let totalMayor = 0;
  let totalCouncillor = 0;
  let totalTrustees = 0;
  let totalComissioners = 0;

  for (let i = 0; i < candidateJSON.length; i++) {
    if (candidateJSON[i].candidatePosition === 'Mayor') {
      totalMayor += 1;
    } else if (candidateJSON[i].candidatePosition === 'Councillor') {
      totalCouncillor += 1;
    } else if (candidateJSON[i].candidatePosition === 'School trustee') {
      totalTrustees += 1;
    } else if (
      candidateJSON[i].candidatePosition === 'Park Board commissioner'
    ) {
      totalComissioners += 1;
    }
  }

  const summary = positions.map(position => {
    return (
      <tr key={position.positionName}>
        <th>{position.positionName}</th>
        <th>of {position.numberNeeded}</th>
      </tr>
    );
  });

  return (
    <div className='table-responsive table-container'>
      <table className='table'>
        <thead />
        <tbody>{summary}</tbody>
      </table>
    </div>
  );
};

export default CandidatesTally;
