import React from 'react';

const Email = () => {
  return (
    <div>
      <div className="row">
        <div className="col-5 pr-0">
          <label htmlFor='email'>E-mail Address:</label>
        </div>
        <div className="col-7 px-0">
          <input
            id='email'
            aria-describedby='email'
            aria-required='true'
            type='text'
            name='email'
          />
        </div>
      </div>
      <div className="row">
        <div className="col-5 pr-0">
          <label htmlFor='subject'>Subject:</label>
        </div>
        <div className="col-7 px-0">
          <input
            id='subject'
            aria-describedby='subject'
            type='text'
            name='subject'
          />
        </div>
      </div>
      <div className="row">
        <div className="col-5 pr-0">
          <label htmlFor='message'>Message:</label>
        </div>
        <div className="col-7 px-0">
          <input
            id='message'
            aria-describedby='message'
            type='text'
            name='message'
          />
        </div>
      </div>
      <button className="btn btn-secondary" aria-label='send email'>Send Reminder Email</button>
    </div>
  );
};

export default Email;
