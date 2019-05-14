import React from 'react';
//   phone,
//   email,
//   hours
const Details = ({ pollingPlace }) => {
  return (
    <div>
      <span className='lead'>{pollingPlace.name}</span>
      <p>{pollingPlace.address}</p>
      <p>{(pollingPlace.distance / 1000).toFixed(2)} km away</p>
      <ul className='fa-ul'>
        <li>
          <span className='fa-li'>
            <i className='fas fa-door-open' />
          </span>
          General Access: {pollingPlace.generalAccessInfo}
        </li>
        <li>
          <span className='fa-li'>
            <i className='fab fa-accessible-icon' />
          </span>
          Wheelchair Access:
          {pollingPlace.wheelchairInfo}
        </li>
        <li>
          <span className='fa-li'>
            <i className='fas fa-parking' />
          </span>
          Parking:
          {pollingPlace.parkingInfo}
        </li>
        <li>
          <span className='fa-li'>
            <i className='fas fa-toilet' />
          </span>
          Washrooms:
          {pollingPlace.washroomInfo}
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
