import React from 'react';

const CandidatesTally = ({ candidateJSON }) => {
    let totalMayor = 0;
    let totalCouncillour = 0;
    let totalTrustees = 0;
    let totalComissioners = 0;


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
            <th>{totalCouncillour}</th>
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
