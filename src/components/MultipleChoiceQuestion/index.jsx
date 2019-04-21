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
    <>
      <p>{title}</p>
      <p>{description}</p>
      {options}
    </>
  );
};

export default MultipleChoiceQuestion;
