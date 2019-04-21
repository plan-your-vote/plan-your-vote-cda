import React from 'react';

const ICS = () => {
  return (
    <>
      <label for='dateSelector' aria-label='format: year month day'>
        Date:
      </label>
      <select id='dateSelector'>
        <option aria-describedby='info'>2019-04-15</option>
        <option aria-describedby='info'>2019-05-23</option>
        <option aria-describedby='info'>2019-06-28</option>
      </select>

      <div title='Add to Calendar'>
        Add to Calendar
        <span class='start'>2019-06-28 08:00 AM</span>
        <span class='end'>2019-06-28 03:00 PM</span>
        <span class='timezone'>America/Vancouver</span>
        <span class='title'>Canadian Federal Election 2020</span>
        <span class='description'>
          Elect members of the Legislative Assembly in Canada
        </span>
      </div>
    </>
  );
};

export default ICS;
