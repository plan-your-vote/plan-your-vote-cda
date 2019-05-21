import React from 'react';

const ReviewQuestions = ({ title, answer, description }) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>Question: {description}</p>
      <p>Answer: {answer}</p>
    </div>
  );
};

export default ReviewQuestions;
