import React from 'react';

const CandidatesTally = ({ candidateJSON, positions }) => {
  positions.forEach(position => {
    position.count = 0;
  });

  candidateJSON.forEach(candidate => {
    const position = positions.find(position => {
      return position.positionName === candidate.candidatePosition;
    });
    position.count++;
  });

  const summary = positions.map(position => {
    return (
      <tr key={position.positionName}>
        <th>{position.positionName}</th>
        <th>
          {position.count} of {position.numberNeeded}
        </th>
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
