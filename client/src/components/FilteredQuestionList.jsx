import React from 'react'
import QuestionList from './QuestionList'

const FilteredQuestionList = ({questions}) => (
  <QuestionList questions={questions.filter(question => question.response)}/>
)

export default FilteredQuestionList
