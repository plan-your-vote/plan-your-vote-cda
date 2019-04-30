import React from 'react';

const MultipleChoiceQuestion = ({ title, description, name, values }) => {
  const options = values.map(item => {
    return (
      <div key={item.value}>
        <input type='radio' name={name} value={item.value} />
        {item.text}
      </div>
    );
  });

  return (
    <div className="col-md-12 mt-5">
      <h5>{title}</h5>
      <p>{description}</p>
      <fieldset className="mcq-options">
        <legend>How do you plan to answer {title}?</legend>
        {options}
      </fieldset>
    </div>
  );
};

export default MultipleChoiceQuestion;
