import React, { Component } from 'react';
import MultipleChoiceQuestion from 'components/MultipleChoiceQuestion';
import SectionHeader from 'components/SectionHeader';
import pyv from 'apis/pyv';

class Capital extends Component {
  _isMounted = false;
  state = {
    header: {
      pageTitle: '',
      pageDescription: ''
    },
    ballotIssues: []
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadApiData().then(data => {
      if (this._isMounted) {
        this.setState({
          ballotIssues: data.ballotIssues,

          header: {
            pageTitle: data.votingPage.pageTitle,
            pageDescription: data.votingPage.pageDescription
          }
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadApiData = async () => {
    const response = await pyv.get('/api/ballotissues');
    const data = response.data;
    return data;
  };

  render() {
    const mcQ = this.state.ballotIssues.map(mcQuestions => {
      return (
        <MultipleChoiceQuestion
          key={mcQuestions.ballotIssueId}
          title={mcQuestions.ballotIssueTitle}
          description={mcQuestions.description}
          name={mcQuestions.ballotIssueId}
          values={mcQuestions.ballotIssueOptions}
        />
      );
    });

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <SectionHeader
              title={this.state.header.pageTitle}
              level='2'
              description={this.state.header.pageDescription}
            />
          </div>
        </div>
        <div className='row mb-4'>{mcQ}</div>
      </div>
    );
  }
}

export default Capital;
