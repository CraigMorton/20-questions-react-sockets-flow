import React from 'react'
import Heading from './generic/Heading'
import SingleTextInputForm from './generic/SingleTextInputForm'

export default function QuestionForm({
  prompt: string = 'Ask a question',
  onSubmit: function,
}) : JSX.Element {
  return (
    <div>
      <Heading size={3}>Ask a question:</Heading>
      <p>{prompt}</p>
      <SingleTextInputForm
        placeholderText='Ask a question about the celebrity...'
        onSubmit={(question) => onSubmit(question)}
      />
    </div>
  )
}
