import React from 'react';
import { CMS_BASE_URL } from 'constants/baseURL';

const CandidateCard = ({ candidate, displayModal }) => {
  return (
    <div className='col-sm-3 col-6'>
      <div
        className='card'
        onClick={() => displayModal(candidate)}
        data-toggle='modal'
        data-target={`#candidate-${candidate.candidateId}-modal`}
				id={`candidate-card-${candidate.candidateId}`}
      >
        <img
          src={`${CMS_BASE_URL}/${candidate.picture}`}
          className='card-img-top'
          alt={candidate.name}
        />
        <div className='card-body'>
          <h5 className='card-title'>{candidate.name}</h5>
          <h6 className='card-subtitle mb-2 text-muted'>
            {candidate.organizationName}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
