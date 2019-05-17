import React from 'react';
import { CMS_BASE_URL } from 'constants/baseURL';

const CandidateModal = ({
  position,
  candidate,
  selectFunction,
  selectedCandidates
}) => {
  const getDesiredDetail = key => {
    let desiredDetail;
    candidate.details.map(detail => {
      if (detail.title === key) {
        desiredDetail = detail;
      }
      return null;
    });
    return desiredDetail;
  };

  const displayPriority = priority => {
    if (!priority) {
      return null;
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

        if (contactHandle === '?hl=en' || contactHandle === '') {
          contactHandle = splitURL[splitURL.length - 2];
        }

        contactMethod += `@${contactHandle}`;
        contactMethod = <a href={found.contactValue}> {contactMethod}</a>;
      }

      if (found.contactMethod === 'Twitter') {
        let splitURL = found.contactValue.split('/');
        let contactHandle = splitURL[splitURL.length - 1];
        contactMethod += `@${contactHandle}`;
        contactMethod = <a href={found.contactValue}> {contactMethod}</a>;
      }

      if (found.contactMethod === 'Email') {
        contactMethod += found.contactValue;
        contactMethod = (
          <a href={`mailto: ${contactMethod}`}> {contactMethod}</a>
        );
      }

      if (
        found.contactMethod === 'Website' ||
        found.contactMethod === 'Facebook' ||
        found.contactMethod === 'Youtube' ||
        found.contactMethod === 'Other'
      ) {
        contactMethod += found.contactValue;
        let splitURL = contactMethod.split('');
        if (
          splitURL[0] !== 'h' ||
          splitURL[1] !== 't' ||
          splitURL[2] !== 't' ||
          splitURL[3] !== 'p'
        ) {
          contactMethod = `https://${contactMethod}`;
        }

        contactMethod = <a href={contactMethod}> {contactMethod}</a>;
      }

      if (found.contactMethod === 'Phone') {
        contactMethod += found.contactValue;
      }
    } else {
      contactMethod += 'Not Provided';
    }

    return (
      <div key={key}>
        <span className='modalTitles'>{key}:</span> {contactMethod}
      </div>
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
      <div
        className='modal-dialog modal-lg modal-dialog-centered'
        role='document'
      >
        <div className='modal-content'>
          <div className='nonScroll'>
            <div className='modal-header'>
              <h3
                className='modal-title'
                id={`candidate-${candidate.candidateId}-modal-label`}
              >
                {candidate.name}
                <br />
                <span className='card-subtitle mb-2 text-muted'>
                  {candidate.organizationName}
                </span>
              </h3>
              <br />

              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
          </div>
          <div className='modal-body'>
            <div className='nonScroll'>
              <img
                src={`${CMS_BASE_URL}/${candidate.picture}`}
                className='card-img-top'
                alt={candidate.name}
              />
              <button
                type='button'
                onClick={selectFunction(position, candidate)}
                className='btn btn-primary addCanBtn'
              >
                {selectedCandidates.length === 0
                  ? 'ADD'
                  : selectedCandidates.findIndex(
                      cand => cand.candidateId === candidate.candidateId
                    ) >= 0
                  ? 'REMOVE'
                  : 'ADD'}
              </button>
            </div>
            <br />
            <br />
            <div className='modalScroll'>
              <span className='modalTitles'>Top 3 Priorities:</span>
              <br />
              1. {displayPriority(getDesiredDetail('Priority 1'))}
              <br />
              2. {displayPriority(getDesiredDetail('Priority 2'))}
              <br />
              3. {displayPriority(getDesiredDetail('Priority 3'))}
              <br />
              <br />
              <span className='modalTitles'>Platform:</span>
              <br />
              {displayPriority(getDesiredDetail('Platform'))}
              <br />
              <br />
              <span className='modalTitles'>Biography:</span> <br />{' '}
              {displayPriority(getDesiredDetail('Biography'))}
              <br />
              <br />
              {displayContact}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
