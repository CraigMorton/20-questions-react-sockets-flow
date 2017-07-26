import React from 'react'

const MultiButtonForm = ({onSubmit, choices}) => (
  <div>
    {choices.map((choice, index) => (
      <button key={index} onClick={() => onSubmit(choice)}>{choice}</button>
    ))}
  </div>
)

export default MultiButtonForm
