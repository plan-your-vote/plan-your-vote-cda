import React from 'react';

const Email = () => {
  return (
    <>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor='email'>E-mail Address:</label>
              </td>
              <td>
                <input
                  id='email'
                  aria-describedby='email'
                  aria-required='true'
                  type='text'
                  name='email'
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='subject'>Subject:</label>
              </td>
              <td>
                <input
                  id='subject'
                  aria-describedby='subject'
                  type='text'
                  name='subject'
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='message'>Message:</label>
              </td>
              <td>
                <input
                  id='message'
                  aria-describedby='message'
                  type='text'
                  name='message'
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="btn" aria-label='send email'>Send Reminder Email</button>
      </div>
    </>
  );
};

export default Email;
