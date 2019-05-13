import React from 'react';
import { CMS_BASE_URL } from 'constants/api';
import './style.css';

const CandidateCard = ({ candidate, displayModal }) => {
  return (
    <div className='col-sm-3'>
      <div
        className='card'
        onClick={() => displayModal(candidate)}
        data-toggle='modal'
        data-target={`#candidate-${candidate.candidateId}-modal`}
      >
        <img
          src={`${CMS_BASE_URL}/${candidate.picture}`}
          className='card-img-top'
          alt={candidate.name}
        />
        <div className='card-body'>
          <h5 className='card-title'>{candidate.name}</h5>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
