import React from 'react';

const MultipleChoiceQuestion = ({
  title,
  description,
  id,
  radioFunction,
  answer
}) => {
  const sentence = () => {
    let question;

    switch (id) {
      case 1:
        question = <>to borrowing $100,353,000</>;
        break;
    case 2:
        question = <>to borrowing $99,557,000</>;
        break;
    case 3:
        question = <>to borrowing $100,090,000</>;
        break;
      default:
        question = <>Unanswered</>
    }

    return question
  };
  return (
    <div className='col-md-12 mt-5 qSection'>
      <h5>{title}</h5>
      <p>
        <span className='reviewAnswers'>{answer}</span> {sentence()}
      </p>
    </div>
  );
};

export default MultipleChoiceQuestion;
