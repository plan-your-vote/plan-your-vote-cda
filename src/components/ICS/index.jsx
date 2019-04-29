import React from 'react';

const ICS = () => {
  return (
    <div>
      <label
        htmlFor='dateSelector'
        aria-label='format: year month day'
        className="col-form-label"
        id="info"
      >
        Date:
      </label>
      <select id='dateSelector'>
        <option aria-describedby='info'>2019-04-15</option>
        <option aria-describedby='info'>2019-05-23</option>
        <option aria-describedby='info'>2019-06-28</option>
      </select>

      <div
        id="addtocalendar"
      >
        Add to Calendar
      </div>
      <button
        aria-label="Generating and downloading pdf summary of your plan. Remember to officially vote in person on election day."
        className="btn btn-secondary"
      >
        Generate Voting Plan PDF
      </button>
    </div>
  );
};

export default ICS;
