import React from 'react';

const CandidateSectionHeader = ({ candidatePosition, races }) => {
  let instructions;
  let heading;

  switch (candidatePosition) {
    case 'Mayor':
      heading = <>FOR THE ELECTION, YOU CAN VOTE FOR 1 CANDIDATE</>;
      instructions = (
        <>
          The mayor leads City Council. City Council has the authority to pass
          bylaws that control many things in Vancouver.
        </>
      );
      break;

    case 'Councillor':
      heading = <>FOR THE ELECTION, YOU CAN VOTE FOR UP TO 10 CANDIDATES</>;
      instructions = (
        <>
          Together, the mayor and councillors are responsible for services such
          as bylaws, taxes, streets, sidewalks, and water.
        </>
      );
      break;
    case 'Park Board commissioner':
      heading = <>FOR THE ELECTION, YOU CAN VOTE FOR UP TO 7 CANDIDATES</>;
      instructions = (
        <>
          The Park Board is responsible for managing City parks and community
          centres, and provides a wide range of recreation services.
        </>
      );
      break;
    case 'School trustee':
      heading = <>FOR THE ELECTION, YOU CAN VOTE FOR UP TO 9 CANDIDATES</>;
      instructions = (
        <>
          The school board is independent of City Council. It provides
          elementary, secondary, community, and specialized education
          services in the city, UBC Lands, and University Endowment Lands.
        </>
      );
      break;
    default:
      heading = <>NO HEADING</>;
      instructions = <>NO INSTRUCTIONS</>;
  }

  return (
    <>
      <h4>
        <span className='card-subtitle mb-2 text-muted'>{heading}</span>
      </h4>
      <br />
      <p>{instructions}</p>
    </>
  );
};

export default CandidateSectionHeader;
