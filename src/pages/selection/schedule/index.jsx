import React from 'react';
import Map from 'components/Map';
import SectionHeader from 'components/SectionHeader';
import dummyHeader from 'constants/dummyData/pages.json';

const Schedule = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <SectionHeader
            title={dummyHeader[2].title}
            subtitle={dummyHeader[2].subtitle}
            level='2'
            description={dummyHeader[2].description}
          />
        </div>
        <div className='col-md-6'>
          <i class='far fa-calendar-check' />
          <select name='schedule'>
            <option value='May 12, 2019'>May 12, 2019</option>
            <option value='May 13, 2019'>May 13, 2019</option>
            <option value='May 14, 2019'>May 14, 2019</option>
            <option value='May 15, 2019'>May 15, 2019</option>
          </select>
          <br />
          <i class='fas fa-map-marker-alt' />
          <input name='location' type='text' />
          <Map />
        </div>
        <div className='col-md-6'>
          <ul class='list-group list-group-flush'>
            <li class='list-group-item'>
              <div>
                <span className='lead'>Centre Branch</span>
                <p>350 W Georgia st / 0.4km away</p>
                <i class='fab fa-accessible-icon' /> Wheelchair Access: via ramp
                at the main entrance on East Hastings St
                <br />
                <i class='fas fa-parking' /> Parking: Street
                <br />
                <i class='fas fa-toilet' /> Washrooms: Wheelchair Accessible
                <br />
                <i class='fas fa-phone' /> 604-456-7890
                <br />
                <i class='fas fa-envelope' /> dummy@planyourvote.com
                <br />
                <i class='far fa-clock' /> Voting Hours:
                <br />
                May 12: 08:30AM - 05:00PM
                <br />
                May 13: 10:00AM - 03:00PM
              </div>
            </li>
            <li class='list-group-item'>Dapibus ac facilisis in</li>
            <li class='list-group-item'>Morbi leo risus</li>
            <li class='list-group-item'>Porta ac consectetur ac</li>
            <li class='list-group-item'>Vestibulum at eros</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
