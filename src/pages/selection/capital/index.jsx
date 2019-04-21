import React from 'react';
import MultipleChoiceQuestion from 'components/MultipleChoiceQuestion';
import dummyData from 'constants/dummyData/multipleChoice.json';

const Capital = () => {
  const multipleChoice = dummyData.map(question => {
    return (
      <MultipleChoiceQuestion
        key={question.name}
        title={question.title}
        description={question.description}
        name={question.name}
        values={question.values}
      />
    );
  });

  return (
    <>
      Capital
      {multipleChoice}
    </>
  );
};

export default Capital;
