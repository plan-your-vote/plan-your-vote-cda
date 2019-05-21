import React from 'react';

const SectionHeader = ({ title, subtitle, level, description }) => {
  let heading;
  let subheading;

  switch (level) {
    case 2:
    case '2':
      heading = <h2>{title}</h2>;
      subheading = <h3>{subtitle}</h3>;
      break;
    case 3:
    case '3':
      heading = <h3>{title}</h3>;
      subheading = <h4>{subtitle}</h4>;
      break;
    case 4:
    case '4':
      heading = <h4>{title}</h4>;
      subheading = <h5>{subtitle}</h5>;
      break;
    case 5:
    case '5':
      heading = <h5>{title}</h5>;
      subheading = <h6>{subtitle}</h6>;
      break;
    case 6:
    case '6':
      heading = <h6>{title}</h6>;
      subheading = <p>{subtitle}</p>;
      break;
    case 1:
    case '1':
    default:
      heading = <h1>{title}</h1>;
      subheading = <h2>{subtitle}</h2>;
      break;
  }

  heading = title ? heading : undefined;
  subheading = subtitle ? subheading : undefined;

  return (
    <>
      {heading}
      {subheading}
      <h4><span className='card-subtitle mb-2 text-muted'>{description}</span></h4>
    </>
  );
};

export default SectionHeader;
