import React from 'react';

const ICS = () => {
  return (
    <>
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
          title='Add to Calendar'
          className="addeventatc"
          id="addeventatc1"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Add to Calendar
          <span className='start atc_node notranslate'>2019-06-28 08:00 AM</span>
          <span className='end atc_node notranslate'>2019-06-28 03:00 PM</span>
          <span className='timezone atc_node notranslate'>America/Vancouver</span>
          <span className='title atc_node notranslate'>Canadian Federal Election 2020</span>
          <span className='description atc_node notranslate'>
            Elect members of the Legislative Assembly in Canada
          </span>
          <span className="addeventatc_icon atc_node notranslate"></span>
          <span
            id="addeventatc1-drop"
            className="addeventatc_dropdown"
            aria-hidden="true"
            aria-labelledby="addeventatc1"
          >
            <span
              className="ateappleical"
              id="addeventatc1-appleical"
              role="menuitem">
              Apple
            </span>
            <span
              className="ategoogle"
              id="addeventatc1-google"
              role="menuitem">
              Google 
              <em>(online)</em>
            </span>
            <span
              className="ateoutlook"
              id="addeventatc1-outlook"
              role="menuitem">
              Outlook
            </span>
            <span
              className="ateoutlookcom"
              id="addeventatc1-outlookcom"
              role="menuitem">
              Outlook.com 
              <em>(online)</em>
            </span>
            <span
              className="ateyahoo"
              id="addeventatc1-yahoo"
              role="menuitem">Yahoo 
              <em>(online)</em>
            </span>
            <em className="copyx">
              <em className="brx"></em>
              <em className="frs">
                <a
                  href="https://www.addevent.com"
                  title=""
                  tabIndex="-1"
                  id="addeventatc1-home"
                >
                AddEvent.com
                </a>
              </em>
            </em>
          </span>
        </div>
        <button
          aria-label="Generating and downloading pdf summary of your plan. Remember to officially vote in person on election day."
          className="btn btn-secondary"
        >
          Generate Voting Plan PDF
        </button>
      </div>
    </>
  );
};

export default ICS;
