import React from 'react';

const Details = ({ pollingPlace }) => {
  const title = (placeName, stationName) => {
    if (!placeName) {
      return null;
    }

    if (!stationName) {
      return <p className='lead'>{placeName}</p>;
    }

    return (
      <>
        <p className='lead'>{placeName}</p>
        <p>{stationName}</p>
      </>
    );
  };

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

  const location = (address, localArea) => {
    if (!address) {
      return null;
    }

    let content = !localArea ? `${address}, ${localArea}` : address;

    return (
      <li>
        <span className='fa-li'>
          <i className='fas fa-map-marker-alt' />
        </span>
        {content}
      </li>
    );
  };

  return (
    <div>
      {title(pollingPlace.pollingPlaceName, pollingPlace.pollingStationName)}
      <ul className='fa-ul'>
        {location(pollingPlace.address, pollingPlace.localArea)}
        {!isNaN(pollingPlace.distance)
          ? listElement(
              'fas fa-route',
              `${(pollingPlace.distance / 1000).toFixed(2)} km away`
            )
          : null}
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
