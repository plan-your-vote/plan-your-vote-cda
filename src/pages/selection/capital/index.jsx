import React, { Component } from 'react';
import MultipleChoiceQuestion from 'components/MultipleChoiceQuestion';
import SectionHeader from 'components/SectionHeader';
import pyv from 'apis/pyv';
import { Link } from 'react-router-dom';
import * as routes from 'constants/routes';

class Capital extends Component {
  _isMounted = false;
  state = {
    header: {
      pageTitle: '',
      pageDescription: ''
    },
    ballotIssues: [],
    selectedAnswers: []
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadApiData().then(data => {
      if (this._isMounted) {
        const { stepTitle, stepDescription, stepNumber } = data.step;
        this.setState({
          ballotIssues: data.ballotIssues.ballotIssues,
          header: {
            stepTitle,
            stepDescription,
            stepNumber
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
    const step = await pyv.get('/api/steps/2');
    const data = {
      ballotIssues: response.data,
      step: step.data
    };
    return data;
  };

  radioBtn = (ballotIssueID, answer, title, description) => event => {
    const { selectedAnswers } = this.state;
    const copySA = selectedAnswers.slice(0);
    const found = selectedAnswers.findIndex(
      ballotIssue => ballotIssue.ballotIssueID === ballotIssueID
    );

    if (found > -1) {
      const temp = {
        ballotIssueID: ballotIssueID,
        ballotIssueAnswer: answer,
        ballotIssueTitle: title,
        ballotIssueDescription: description
      };

      copySA.splice(found, 1, temp);
    } else {
      const temp = {
        ballotIssueID: ballotIssueID,
        ballotIssueAnswer: answer,
        ballotIssueTitle: title,
        ballotIssueDescription: description
      };

      copySA.push(temp);
    }

    this.setState({ selectedAnswers: copySA }, () => {
      if (found > -1) {
        sessionStorage.removeItem('capitalAnswers');
      }
      sessionStorage.setItem('capitalAnswers', JSON.stringify(copySA));
    });
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
          radioFunction={this.radioBtn}
        />
      );
    });

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <SectionHeader
              title={this.state.header.stepTitle}
              level='2'
              description={this.state.header.stepDescription}
            />
            <Link to={routes.CANDIDATES} className='btn btn-secondary backBtn'>
              BACK
            </Link>
            <Link to={routes.SCHEDULE} className='btn btn-secondary nextBtn'>
              NEXT
            </Link>
          </div>
        </div>
        <div className='row mb-4'>{mcQ}</div>
        <br />
        <Link to={routes.CANDIDATES} className='btn btn-secondary backBtn'>
          BACK
        </Link>
        <Link to={routes.SCHEDULE} className='btn btn-secondary nextBtn'>
          NEXT
        </Link>
        <br />
        <br />
      </div>
    );
  }
}

export default Capital;
