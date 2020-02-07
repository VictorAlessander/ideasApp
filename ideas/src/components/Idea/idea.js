import React from 'react';
import * as situations from '../../constants/Ideas/ideas';


const idea = (props) => {

  const describedSituation = () => {
    switch(props.situation) {
      case 1:
        return situations.REGISTERED;
      case 2:
        return situations.UNDER_DEVELOPMENT;
      case 3:
        return situations.FINISHED;
      case 4:
        return situations.CANCELLED;
      default:
        return "";
    }
  };

  return (
    <>
      <p>Description: {props.description}</p>
      <p>Viability: {props.viability}</p>
      <p>Identification date: {props.identificationDate}</p>
      <p>Situation: {describedSituation()}</p>
      <p>Owner: {props.owner}</p>
      <p>Conclusion date: {props.conclusionDate}</p>
    </>
  )
}

export default idea;