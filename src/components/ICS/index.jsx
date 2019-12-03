import React from 'react';
import onButtonClick from 'components/PDF';

const dateSelector = dates => {
  const options = dates.map(date => {
    return <option key={date} aria-describedby='info'>{date}</option>;
  });

  return <select id='dateSelector'>{options}</select>;
};


const ICS = ({data}) => {
  return (
    <div>
      <label
        htmlFor='dateSelector'
        aria-label='format: year month day'
        className='col-form-label'
        id='info'
      >
        Date:
      </label>
      {dateSelector(['2019-04-15', '2019-05-23', '2019-06-28'])}
      <div id='addtocalendar'>Add to Calendar</div>
      <button
        aria-label='Generating and downloading pdf summary of your plan. Remember to officially vote in person on election day.'
        className='btn btn-secondary'
        onClick={() => onButtonClick(data)}
      >
        Generate Voting Plan PDF
      </button>
    </div>
  );
};

export default ICS;
