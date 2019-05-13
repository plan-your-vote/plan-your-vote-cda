import React from 'react';
//   phone,
//   email,
//   hours
const Details = ({ pollingStation }) => {
  return (
    <div>
      <span className='lead'>{pollingStation.name}</span>
      <p>{pollingStation.address}</p>
      <p>{(pollingStation.distance / 1000).toFixed(2)} km away</p>
      <ul className='fa-ul'>
        <li>
          <span className='fa-li'>
            <i className='fas fa-door-open' />
          </span>
          General Access: {pollingStation.generalAccessInfo}
        </li>
        <li>
          <span className='fa-li'>
            <i className='fab fa-accessible-icon' />
          </span>
          Wheelchair Access:
          {pollingStation.wheelchairInfo}
        </li>
        <li>
          <span className='fa-li'>
            <i className='fas fa-parking' />
          </span>
          Parking:
          {pollingStation.parkingInfo}
        </li>
        <li>
          <span className='fa-li'>
            <i className='fas fa-toilet' />
          </span>
          Washrooms:
          {pollingStation.washroomInfo}
        </li>
        <li>
          <span className='fa-li'>
            <i className='fas fa-phone' />
          </span>
          604-456-7890
        </li>
        <li>
          <span className='fa-li'>
            <i className='fas fa-envelope' />
          </span>
          dummy@planyourvote.com
        </li>
        <li>
          <span className='fa-li'>
            <i className='far fa-clock' />
          </span>
          Voting Hours:
          <ul>
            <li>May 12: 08:30AM - 05:00PM</li>
            <li>May 13: 10:00AM - 02:00PM</li>
            <li>May 14: 09:00AM - 06:00PM</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Details;
