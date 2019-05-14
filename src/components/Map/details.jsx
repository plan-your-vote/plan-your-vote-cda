import React from 'react';

const Details = ({ pollingPlace }) => {
  const listElement = (iconClassName, content) => {
    if (!content) {
      return null;
    }

    if (content === true) {
      content = 'Advance Only';
    }

    return (
      <li>
        <span className='fa-li'>
          <i className={iconClassName} />
        </span>
        {content}
      </li>
    );
  };

  return (
    <div>
      <p className='lead'>{pollingPlace.pollingPlaceName}</p>
      <p>{pollingPlace.pollingStationName}</p>
      <ul className='fa-ul'>
        {listElement(
          'fas fa-map-marker-alt',
          `${pollingPlace.address}, ${pollingPlace.localArea}`
        )}
        {listElement(
          'fas fa-route',
          `${(pollingPlace.distance / 1000).toFixed(2)} km away`
        )}
        {listElement('far fa-check-circle', pollingPlace.advanceOnly)}
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

        {listElement('fab fa-accessible-icon', pollingPlace.wheelchairInfo)}
        {listElement('fas fa-parking', pollingPlace.parkingInfo)}
        {listElement('fas fa-phone', pollingPlace.phone)}
        {listElement('fas fa-envelope', pollingPlace.email)}
      </ul>
    </div>
  );
};

export default Details;
