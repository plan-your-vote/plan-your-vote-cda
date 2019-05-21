import React from 'react';

const CandidateSectionHeader = ({ pollDetails }) => {
  if (!pollDetails) {
    return null;
  }

  const schedule = () => {
    const { pollingPlaceDates } = pollDetails[0];

    return pollingPlaceDates.map(data => {
      const { startTime, endTime, pollingDate } = data;
      const date = formatDate(pollingDate);
      return (
        <p>{`${date}, ${formatTime(startTime)} - ${formatTime(endTime)}`}</p>
      );
    });
  };

  const formatDate = date => {
    if (!date) {
      return 'N/A';
    }

    return new Date(date).toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = time => {
    if (!time) {
      return 'N/A';
    }

    return new Date(time).toLocaleString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <p>
        <span className='pollPoints'>Address:</span> {pollDetails[0].address}
      </p>
      <span className='pollPoints'>Voting Days:</span>
      {schedule()}
    </>
  );
};

export default CandidateSectionHeader;
