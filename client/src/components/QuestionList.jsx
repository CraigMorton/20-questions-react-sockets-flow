import React from 'react'
import glamorous from 'glamorous'
import Heading from './generic/Heading'

const BoldText = glamorous.span({
  fontWeight: 'bold',
  '&::after': {
    content: '" - "',
    fontWeight: 'normal',
  },
})

const List = glamorous.ul({
  listStyleType: 'none',
})

const QuestionList = ({questions}) => (
  <div>
    <Heading size={3}>Previous questions:</Heading>
    <List>
      {questions.map((question, index) => (
        <li key={index}>
          {question.response && <BoldText>{question.response}</BoldText>}
          {question.question}
        </li>
      ))}
    </List>
  </div>
)

export default QuestionList
