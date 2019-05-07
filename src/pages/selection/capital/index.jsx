import React, { Component } from 'react';
import MultipleChoiceQuestion from 'components/MultipleChoiceQuestion';
import SectionHeader from 'components/SectionHeader';
import pyv from 'utils/api/pyv';
// import dummyData from 'constants/dummyData/multipleChoice.json';

class Capital extends Component {
  _isMounted = false;

  state = {
    header: {},
    ballotIssues: []
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadApiData().then(data => {
      if (this._isMounted) {
        this.setState({
          ballotIssues: data.ballotIssues,
          header: data
        })
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadApiData = async () => {
    const response = await pyv.get('/ballotissues');
    const data = response.data;
    return data;
  };

 

  render() {
    console.log(this.state.header)
    const ballotIssuesHeader = []

    const mcQ = this.state.ballotIssues.map(mcQuestions => {
      return (
        <MultipleChoiceQuestion
          key={mcQuestions.ballotIssueId}
          title={mcQuestions.ballotIssueTitle}
          description={mcQuestions.description}
          name={mcQuestions.ballotIssueId}
          values={mcQuestions.ballotIssueOptions}
        />
      )
    })

    // const formerMC = dummyData.map(test => {
    //   return (
    //     <MultipleChoiceQuestion
    //       key={test.name}
    //       title={test.title}
    //       description={test.description}
    //       name={test.name}
    //       values={test.values}
    //     />
    //   )
    // })


    for (var bSection in this.state.header) {
      ballotIssuesHeader.push(
        <SectionHeader
            title={this.state.header[bSection].pageTitle} 
            subtitle=""
            level='2'
            description={this.state.header[bSection].pageDescription}
        /> 
      )
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            {ballotIssuesHeader}
          </div>
        </div>
        <div className='row mb-4'>{mcQ}</div>
      </div>
    );
  }
}

export default Capital;
