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

  const displayPriority = priority => {
    if (!priority) {
      return '';
    }
    return priority.text;
  };

  const contactMethodList = [
    'Phone',
    'Email',
    'Website',
    'Twitter',
    'Facebook',
    'Instagram',
    'Youtube',
    'Other'
  ];

  const displayContact = contactMethodList.map(cmItem => {
    let contactMethod = ``;
    let key = `${cmItem}`;
    const found = candidate.contacts.find(
      contact => contact.contactMethod === cmItem
    );
    if (found) {
      if (found.contactMethod === 'Instagram') {
        let splitURL = found.contactValue.split('/');
        let contactHandle = splitURL[splitURL.length - 1];
        if (contactHandle === '') {
          contactHandle = splitURL[splitURL.length - 2];
        }
        contactMethod += `@${contactHandle}`;
        contactMethod = <a href={found.contactValue}> {contactMethod}</a>;
      } else if (found.contactMethod === 'Twitter') {
        let splitURL = found.contactValue.split('/');
        let contactHandle = splitURL[splitURL.length - 1];
        contactMethod += `@${contactHandle}`;
        contactMethod = <a href={found.contactValue}> {contactMethod}</a>;
      } else if (found.contactMethod === 'Website') {
        contactMethod += found.contactValue;
        contactMethod = <a href={found.contactValue}> {contactMethod}</a>;
      } else {
        contactMethod += found.contactValue;
      }
    } else {
      contactMethod += 'Not Provided';
    }

    return (
      <p key={key}>
        {key}: {contactMethod}
      </p>
    );
  });

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
            {displayContact}
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
