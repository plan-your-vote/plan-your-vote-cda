import React, { Component } from 'react';
import MultipleChoiceQuestion from 'components/MultipleChoiceQuestion';
import SectionHeader from 'components/SectionHeader';
import pyv from 'utils/api/pyv';
import dummyData from 'constants/dummyData/multipleChoice.json';
import dummyHeader from 'constants/dummyData/pages.json';

class Capital extends Component {
  state = {};

  componentDidMount() {
    this.loadApiData();
  }

  loadApiData = async () => {
    const response = await pyv.get('/ballotissues');
    const data = response.data;
    console.log(data);
  };

  render() {
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
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <SectionHeader
              title={dummyHeader[1].title}
              subtitle={dummyHeader[1].subtitle}
              level='2'
              description={dummyHeader[1].description}
            />
          </div>
        </div>
        <div className='row mb-4'>{multipleChoice}</div>
      </div>
    );
  }
}

export default Capital;
