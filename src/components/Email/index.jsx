import React from 'react';

const row = (id, labelText, ariaRequired, inputName) => {
  return (
    <div className='row'>
      <div className='col-5 pr-0'>
        <label htmlFor={id}>{labelText}</label>
      </div>
      <div className='col-7 px-0'>
        <input
          id={id}
          aria-describedby={id}
          aria-required={ariaRequired}
          type='text'
          name={inputName}
        />
      </div>
    </div>
  );
};

const Email = (props) => {
  return (
    <div>
      {row('email', 'E-mail Address', true, 'email')}
      <button className='btn btn-secondary' aria-label='send email' onClick={props.finalInfo}>
        Send Reminder Email
      </button>
    </div>
  );
};

export default Email;
