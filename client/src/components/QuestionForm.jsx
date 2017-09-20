import React from 'react'
import Heading from './generic/Heading'
import SingleTextInputForm from './generic/SingleTextInputForm'

type Props = {
  onSubmit: Function,
  prompt: string,
}
function thing() : {
  let aString: string = 'hi'
  aString = 25121
}

{
  key: 'val'
}


export default function QuestionForm({
  prompt = 'Ask a question',
  onSubmit,
} : Props) : JSX.Element {
  return (
    <div>
      <Heading size={3}>Ask a question:</Heading>
      <p>{prompt}</p>
      <SingleTextInputForm
        placeholderText='Ask a question about the celebrity...'
        onSubmit={(question: string) => onSubmit(question)}
      />
      <SingleTextInputForm />
    </div>
  )
}
