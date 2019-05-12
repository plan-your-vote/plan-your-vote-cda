import React from 'react';
import { IMAGE_BASE } from 'utils/image';

const cardStyle = {
  maxWidth: '540px'
};

const CandidateCard = ({ candidate, displayModal }) => {
  return (
    <div className='col-sm-3'>
      <div
        className='card'
        onClick={() => displayModal(candidate)}
        style={cardStyle}
        data-toggle='modal'
        data-target='#exampleModal'
      >
        <img
          src={`${IMAGE_BASE}/${candidate.candidate.picture}`}
          className='card-img-top'
          alt={candidate.candidate.name}
        />
        <div className='card-body'>
          <h5 className='card-title'>{candidate.candidate.name}</h5>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
