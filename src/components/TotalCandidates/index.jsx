import React from 'react';

const CandidatesTally = ({ candidateJSON }) => {
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

  return (
    <div className='table-responsive table-container'>
      <table className='table'>
        <thead />
        <tbody>
          <tr>
            <th>Mayor:</th>
            <th>{totalMayor} of 1</th>
          </tr>
          <tr>
            <th>Councillour:</th>
            <th>{totalCouncillor} of 10</th>
          </tr>
          <tr>
            <th>School Trustee:</th>
            <th>{totalTrustees} of 9</th>
          </tr>
          <tr>
            <th>Comissioners:</th>
            <th>{totalComissioners} of 7</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CandidatesTally;
