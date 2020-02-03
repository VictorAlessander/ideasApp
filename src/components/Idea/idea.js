import React from 'react';


const idea = (props) => {
  return (
    <>
      <p>{props.description}</p>
      <p>{props.viability}</p>
      <p>{props.identificationDate}</p>
      <p>{props.owner}</p>
      <p>{props.conclusionDate}</p>
    </>
  )
}

export default idea;