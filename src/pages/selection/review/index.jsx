import React, { Component } from 'react';
import Email from 'components/Email';
import ICS from 'components/ICS';
import SectionHeader from 'components/SectionHeader';
import dummyHeader from 'constants/dummyData/pages.json';
import { Link } from 'react-router-dom';
import * as routes from 'constants/routes';
import pyv from 'apis/pyv';
import CandidateCard from 'components/CandidateReviewCard';
import MultipleChoiceQuestion from 'components/reviewQuestions';

class Review extends Component {
  state = {
    ballotIssues: [],
    candidatesSelected: []
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadApiData().then(data => {
      if (this._isMounted) {
        this.setState({
          ballotIssues: data.ballotIssues,
          candidatesSelected: JSON.parse(sessionStorage.getItem('selectedCandidateRaces'))
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

  renderCandidates = race => {
    let {candidatesSelected} = this.state

    return candidatesSelected.map(candidate => {
      if (!candidate) {
        return null;
      }

      if (candidate.candidatePosition === race) {
        return (
          <CandidateCard key={candidate.candidateId} candidate={candidate} remove={this.removeFunc} />
        );
      } else {
        return null;
      }
    });
  };

  removeFunc = candidate =>{
    const {candidatesSelected} = this.state
    
    let storageCopy = candidatesSelected.slice(0);
    const found = candidatesSelected.findIndex(cand => cand.candidateId === candidate.candidateId);

    if (found > -1) {
      storageCopy.splice(found,1);
    } else {
      console.error('Candidate Not Found!?')
    }

    this.setState({
      candidatesSelected: storageCopy
    }, () => {
      if(found > -1) {
        sessionStorage.removeItem('selectedCandidateRaces');
      }
      sessionStorage.setItem(
        'selectedCandidateRaces',
        JSON.stringify(storageCopy)
      );
    })
  }

  candidateCount = positionName => {
    let storage = JSON.parse(sessionStorage.getItem('selectedCandidateRaces'));
    let count = 0;

    for (let i = 0; i < storage.length; i++) {
      if (storage[i].candidatePosition === positionName) {
        count += 1;
      }
    }
    return count;
  };

  render() {
    var test = JSON.parse(sessionStorage.getItem('capitalAnswers'));

    const mcQ = test.map(mcQuestions => {
      return (
        <MultipleChoiceQuestion
          key={mcQuestions.ballotIssueId}
          title={mcQuestions.ballotIssueTitle}
          description={mcQuestions.ballotIssueDescription}
          id={mcQuestions.ballotIssueID}
          answer={mcQuestions.ballotIssueAnswer}
        />
      );
    });

    return (
      <div className='container'>
        <div className='row'>
          <SectionHeader
            title={dummyHeader[3].title}
            subtitle={dummyHeader[3].subtitle}
            level='2'
            description={dummyHeader[3].description}
          />
        </div>
        <br />
        <div className='row reviewHeaderTitle'>
          <h3 className='card-subtitle mb-2 text-muted'>
            YOUR CANDIDATES IN BALLOT ORDER:
          </h3>
          <hr />
        </div>
        <div className='row'>
          <h4>MAYOR {this.candidateCount('Mayor')} of 1:</h4>
        </div>
        <div className='row'>{this.renderCandidates('Mayor')}</div>
        <div className='row'>
          <h4>COUNCILLOR {this.candidateCount('Councillor')} of 10:</h4>
        </div>
        <div className='row'>{this.renderCandidates('Councillor')}</div>
        <div className='row'>
          <h4>
            SCHOOL TRUSTEE {this.candidateCount('School trustee')} of 9:
          </h4>
        </div>
        <div className='row'>{this.renderCandidates('School trustee')}</div>
        <div className='row'>
          <h4>
            SCHOOL TRUSTEE {this.candidateCount('Park Board commissioner')} of 7:
          </h4>
        </div>
        <div className='row'>
          {this.renderCandidates('Park Board commissioner')}
        </div>
        <div className='row reviewHeaderTitle'>
          <h3 className='card-subtitle mb-2 text-muted'>
            YOUR PLANNED RESPONSES TO CAPITAL PLAN BORROWING QUESTIONS:
          </h3>
        </div>
        <div className='row mb-4'>{mcQ}</div>
        <div className='row' />
        <div className='row'>
          <div className='col-md-6' />
          <div className='col-md-6'>
            <Email />
            <ICS />
          </div>
        </div>
        <Link to={routes.SCHEDULE} className='btn btn-secondary  backBtn'>
          BACK
        </Link>
      </div>
    );
  }
}

export default Review;
