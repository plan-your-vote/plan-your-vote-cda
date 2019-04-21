import React from 'react';

const Email = () => {
  return (
    <>
      <label htmlFor='email'>E-mail Address</label>
      <input
        id='email'
        aria-describedby='email'
        aria-required='true'
        type='text'
        name='email'
      />
      <label htmlFor='subject'>Subject</label>
      <input
        id='subject'
        aria-describedby='subject'
        type='text'
        name='subject'
      />
      <label htmlFor='message'>Message:</label>
      <input
        id='message'
        aria-describedby='message'
        type='text'
        name='message'
      />

      <button aria-label='send email'>Send Reminder Email</button>
    </>
  );
};

export default Email;
