import React from 'react';
import ReactDOM from 'react-dom';



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

function shoot(){
  console.log("Email Sent");
}

const Email = () => {
  return (
    <div>
      {row('email', 'E-mail Address', true, 'email')}
      {row('subject', 'Subject', false, 'subject')}
      {row('message', 'Message', false, 'message')}
      <button id='root' className='btn btn-secondary' aria-label='send email' onClick={shoot}>
        Send Reminder Email
      </button>
    </div>
  );
};


ReactDOM.render(<button />, document.getElementById("root"));
export default Email;
