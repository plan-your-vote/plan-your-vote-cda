import React from 'react';
import MultipleChoiceQuestion from 'components/MultipleChoiceQuestion';
import SectionHeader from 'components/SectionHeader';
import dummyData from 'constants/dummyData/multipleChoice.json';
import dummyHeader from 'constants/dummyData/pages.json';

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
      <SectionHeader
        title={dummyHeader[1].title}
        subtitle={dummyHeader[1].subtitle}
        level='1'
        description={dummyHeader[1].description}
      />
      {multipleChoice}
    </>
  );
};

export default Capital;
