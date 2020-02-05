import React from 'react';


const idea = (props) => {
  return (
    <>
      <p>Description: {props.description}</p>
      <p>Viability: {props.viability}</p>
      <p>Identification date: {props.identificationDate}</p>
      <p>Situation: {props.situation}</p>
      <p>Owner: {props.owner}</p>
      <p>Conclusion date: {props.conclusionDate}</p>
    </>
  )
}

export default idea;