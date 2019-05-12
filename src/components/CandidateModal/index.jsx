import React from 'react';
import { IMAGE_BASE } from 'utils/image';

const CandidateModal = ({ candidate }) => {
  const getDesiredDetail = key => {
    let desiredDetail;
    candidate.details.map(detail => {
      if (detail.title === key) {
        desiredDetail = detail;
        return '';
      }
      return '';
    });
    return desiredDetail;
  };

  const getContactDetail = key => {
    candidate.contacts.map(contact => {
      return contact;
    });
  };

  const displayPriority = priority => {
    if (!priority) {
      return '';
    }
    return priority.text;
  };

  const displayContact = item => {
    if (!item) {
      return 'Not Provided';
    }
    return item.contactValue;
  };

  return (
    <div
      className='modal fade'
      id={`candidate-${candidate.candidateId}-modal`}
      tabIndex='-1'
      role='dialog'
      aria-labelledby={`candidate-${candidate.candidateId}-modal-label`}
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5
              className='modal-title'
              id={`candidate-${candidate.candidateId}-modal-label`}
            >
              {candidate.name}
            </h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <img
              src={`${IMAGE_BASE}/${candidate.picture}`}
              className='card-img-top'
              alt={candidate.name}
            />
            <br />
            Candidate ID: {candidate.candidateId}
            <br />
            Top 3 Priorities:
            <br />
            1. {displayPriority(getDesiredDetail('Priority 1'))}
            <br />
            2. {displayPriority(getDesiredDetail('Priority 2'))}
            <br />
            3. {displayPriority(getDesiredDetail('Priority 3'))}
            <br />
            Platform: <br />
            {displayPriority(getDesiredDetail('Platform'))}
            <br />
            Biography: <br /> {displayPriority(getDesiredDetail('Biography'))}
            <br />
            {/* HELLO: {candidate.details.id} */}
            <br />
            {displayContact(getContactDetail('contactValue'))}
          </div>
          <div className='modal-footer'>
            {/* <button
                      className='btn btn-primary'
                      onClick={e => this.selectBtn(candidate.candidate)}
                    >
                      Select
                    </button> */}
            <button
              type='button'
              className='btn btn-secondary'
              data-dismiss='modal'
            >
              Close
            </button>
            <button type='button' className='btn btn-primary'>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
