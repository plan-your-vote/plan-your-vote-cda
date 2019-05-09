import React, { Component } from 'react';
//   phone,
//   email,
//   hours
const Details = ({ pollingStation, distance }) => {
  return (
    <div>
      <span className='lead'>{pollingStation.name}</span>
      <p>{pollingStation.address}</p>
      <p>{distance} km away</p>
      <ul>
        <li>General Access: {pollingStation.generalAccessInfo}</li>
        <li>
          <i className='fab fa-accessible-icon' /> Wheelchair Access:
          {pollingStation.wheelchairInfo}
        </li>
        <li>
          <i className='fas fa-parking' /> Parking:
          {pollingStation.parkingInfo}
        </li>
        <li>
          <i className='fas fa-toilet' /> Washrooms:
          {pollingStation.washroomInfo}
        </li>
        <li>
          <i className='fas fa-phone' /> 604-456-7890
        </li>
        <li>
          <i className='fas fa-envelope' /> dummy@planyourvote.com
        </li>
        <li>
          <i className='far fa-clock' /> Voting Hours:
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
