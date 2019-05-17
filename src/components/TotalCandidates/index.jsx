import React from 'react';

const CandidatesTally = ({ candidateJSON }) => {
  let totalMayor = 0;
  let totalCouncillor = 0;
  let totalTrustees = 0;
  let totalComissioners = 0;

  //   if (candidateJSON.length === 0) {
  //       return null;
  //   } else {
  //       console.log(candidateJSON.length);
  //   }

  //   candidateJSON.length === 0 ? null : console.log(candidateJSON.length);

  if (candidateJSON.length === 0) {
    return null;
  } else {
    console.log(candidateJSON);
  }

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
            <th>{totalMayor}</th>
          </tr>
          <tr>
            <th>Councillour:</th>
            <th>{totalCouncillor}</th>
          </tr>
          <tr>
            <th>School Trustee:</th>
            <th>{totalTrustees}</th>
          </tr>
          <tr>
            <th>Comissioners:</th>
            <th>{totalComissioners}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CandidatesTally;
