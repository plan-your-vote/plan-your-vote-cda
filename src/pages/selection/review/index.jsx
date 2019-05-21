import React, { Component } from 'react';
import Email from 'components/Email';
import ICS from 'components/ICS';
import { Link } from 'react-router-dom';
import * as routes from 'constants/routes';
import pyv from 'apis/pyv';
import CandidateCard from 'components/CandidateReviewCard';
import ReviewVoteCard from 'components/ReviewVoteCard';
import ReviewQuestions from 'components/ReviewQuestions';

class Review extends Component {
  state = {
    pageTitle: '',
    pageDescription: null,
    ballotIssues: [],
    candidatesSelected: [],
    racesSummary: []
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadApiData().then(response => {
      const racesSummary = this.summarizeCandidates(response.races.races);
      if (this._isMounted) {
        this.setState({
          pageTitle: response.step.stepTitle,
          pageDescription: response.step.stepDescription,
          ballotIssues: response.ballotIssues.ballotIssues,
          racesSummary,
          candidatesSelected: JSON.parse(
            sessionStorage.getItem('selectedCandidateRaces')
          ),
          pollDetails: JSON.parse(sessionStorage.getItem('pollingPlace'))
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadApiData = async () => {
    const ballotIssues = await pyv.get('/api/ballotissues');
    const steps = await pyv.get('/api/steps');
    const races = await pyv.get('/api/races');

    const data = {
      ballotIssues: ballotIssues.data,
      step: steps.data[3],
      races: races.data
    };

    return data;
  };

  summarizeCandidates = (races = []) => {
    const racesSummary = [];
    races.forEach(race => {
      racesSummary.push({
        positionName: race.positionName,
        numberNeeded: race.numberNeeded
      });
    });
    return racesSummary;
  };

  renderCandidates = race => {
    let { candidatesSelected } = this.state;

    if (!candidatesSelected) {
      return;
    }

    return candidatesSelected.map(candidate => {
      if (!candidate) {
        return null;
      }

      if (candidate.candidatePosition === race) {
        return (
          <CandidateCard
            key={candidate.candidateId}
            candidate={candidate}
            remove={this.removeFunc}
          />
        );
      }

      return null;
    });
  };

  removeFunc = candidate => {
    const { candidatesSelected } = this.state;

    let storageCopy = candidatesSelected.slice(0);
    const found = candidatesSelected.findIndex(
      cand => cand.candidateId === candidate.candidateId
    );

    if (found > -1) {
      storageCopy.splice(found, 1);
    } else {
      console.error('Candidate Not Found!?');
    }

    this.setState(
      {
        candidatesSelected: storageCopy
      },
      () => {
        if (found > -1) {
          sessionStorage.removeItem('selectedCandidateRaces');
        }
        sessionStorage.setItem(
          'selectedCandidateRaces',
          JSON.stringify(storageCopy)
        );
      }
    );
  };

  candidateCount = positionName => {
    const storage = JSON.parse(
      sessionStorage.getItem('selectedCandidateRaces')
    );
    let count = 0;

    if (!storage) {
      return count;
    }

    for (let i = 0; i < storage.length; i++) {
      if (storage[i].candidatePosition === positionName) {
        count += 1;
      }
    }
    return count;
  };

  mcQ = () => {
    const test = JSON.parse(sessionStorage.getItem('capitalAnswers'));
 
    // console.log(test)

    test.map(mcQuestions => {
      return (
        console.log(mcQuestions.ballotIssueAnswer)
        // <ReviewQuestions
        //   // key={mcQuestions.ballotIssueID}
        //   title={test.test}
        //   // answer={mcQuestions.ballotIssueAnswer}
        //   // description={mcQuestions.ballotIssueDescription}
        // />
      );
    });
  };

  candidatesSummary = (positionName, numberNeeded) => {
    return (
      <>
        <div className='col-12'>
          <h4>
            {`${positionName} ${this.candidateCount(
              positionName
            )} of ${numberNeeded}`}
          </h4>
        </div>
        {this.renderCandidates(positionName)}
      </>
    );
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h2>{this.state.pageTitle}</h2>
          </div>
          <div className='col-12'>
            <p>{this.state.pageDescription}</p>
          </div>
        </div>
        <div className='row reviewHeaderTitle'>
          <h3 className='card-subtitle mb-2 text-muted'>
            YOUR CANDIDATES IN BALLOT ORDER:
          </h3>
        </div>
        {this.state.racesSummary.map(race => {
          return (
            <div className='row' key={race.positionName}>
              {this.candidatesSummary(race.positionName, race.numberNeeded)}
            </div>
          );
        })}
        <div className='row reviewHeaderTitle'>
          <h3 className='card-subtitle mb-2 text-muted'>
            YOUR PLANNED RESPONSES TO CAPITAL PLAN BORROWING QUESTIONS:
          </h3>
        </div>
        <div className='row mb-4'>{this.mcQ()}</div>
        <div className='row'>
          <h3 className='card-subtitle mb-2 text-muted'>VOTING DAY DETAILS</h3>
        </div>
        <div className='row'>
          <div className='pollSection'>
            <ReviewVoteCard pollDetails={this.state.pollDetails} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6' />
          <div className='col-md-6'>
            <Email />
            <ICS />
          </div>
        </div>
        <Link to={routes.SCHEDULE} className='btn btn-secondary backBtn'>
          BACK
        </Link>
      </div>
    );
  }
}

export default Review;
