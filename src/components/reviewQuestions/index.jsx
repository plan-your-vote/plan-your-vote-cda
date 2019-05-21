import React from 'react';

const ReviewQuestions = ({ title }) => {
  if (!title) {
    return null;
  }
    console.log(title);

//   let location = pollDetails[0].address;
//   let votingDay = '';

  const sentence = () => {
    console.log('hello')
  };

//   votingDay = votingDay.substring(10, 0);

  return (
    <>
      <p>
        <span className='pollPoints'>Voting Days:</span> {sentence()}
      </p>
    </>
  );
};

export default ReviewQuestions;