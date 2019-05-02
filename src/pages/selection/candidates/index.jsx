import React, { Component } from 'react';
import SectionHeader from 'components/SectionHeader';
import dummyCandidates from 'constants/dummyData/candidates.json';
import dummyHeader from 'constants/dummyData/pages.json';

class Candidates extends Component {

  jsonObject = []

  handleCandidateSelection = event => {
    console.log(event.target.name);
    this.jsonObject.push(event.target.name);
    console.log(this.jsonObject)

  }
  

  render() {
    const thead = dummyCandidates.head.map(item => {
      return <th key={item.id}>{item.text}</th>;
    });

    const tBody = dummyCandidates.body.map(row => {
      return (
        <tr key={JSON.stringify(row)}>
          {row.map(cell => {
            return <td key={cell.id}>{cell.text}</td>;
          })}
          <td>
            <input type='checkbox' 
             name="candidateName"
             onChange= {this.handleCandidateSelection}/>
          </td>
        </tr>
      );
    });

    return (
      <>
        <SectionHeader
          title={dummyHeader[0].title}
          subtitle={dummyHeader[0].subtitle}
          level='1'
          description={dummyHeader[0].description}
        />

        <table>
          <thead>
            <tr>{thead}</tr>
          </thead>
          <tbody>{tBody}</tbody>
        </table>
      </>
    );
  }
}

export default Candidates;
