import React from 'react';

const Details = ({ pollingPlace, selectFunction, selectedStation }) => {
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

  const pollingDates = (pollingDates = []) => {
    return pollingDates.map(pollingDate => {
      return (
        <li key={JSON.stringify(pollingDate)}>
          {new Date(pollingDate.pollingDate).toLocaleString(undefined, {
            month: 'long',
            day: 'numeric'
          })}
          {': '}
          {parseTime(pollingDate.startTime, pollingDate.endTime)}
        </li>
      );
    });
  };

  const parseTime = (startTime, endTime) => {
    if (!startTime || !endTime) {
      return null;
    }

    return `${new Date(startTime).toLocaleString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    })} - ${new Date(endTime).toLocaleString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
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
          <ul>{pollingDates(pollingPlace.pollingPlaceDates)}</ul>
        </li>
        {listElement('fab fa-accessible-icon', pollingPlace.wheelchairInfo)}
        {listElement('fas fa-parking', pollingPlace.parkingInfo)}
        {listElement('fas fa-phone', pollingPlace.phone)}
        {listElement('fas fa-envelope', pollingPlace.email)}
      </ul>
      <br />
      <button className ='btn btn-info' onClick={selectFunction(pollingPlace)}>
        {selectedStation.length === 0
          ? 'SELECT'
          : selectedStation.findIndex(
              station => station.pollingPlaceId === pollingPlace.pollingPlaceId
            ) >= 0
          ? 'REMOVE'
          : 'SELECT'}
      </button>
    </div>
  );
};

export default Details;
