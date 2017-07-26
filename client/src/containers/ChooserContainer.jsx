import React, {Component} from 'react'
import io from 'socket.io-client'
import SingleTextInputForm from '../components/generic/SingleTextInputForm'
import Heading from '../components/generic/Heading'
import MultiButtonForm from '../components/generic/MultiButtonForm'
import FilteredQuestionList from '../components/FilteredQuestionList'

export default class ChooserContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      answer: '',
      questionAsked: false,
      questionCount: 0,
      questions: [],
    }

    this.socket = io()
    this.socketSetupOnQuestionAsked()
  }
  socketSetupOnQuestionAsked() {
    this.socket.on('question', (question) => {
      this.setState(prevState => ({
        questionAsked: true,
        questions: [
          {question: question, response: null},
          ...prevState.questions,
        ],
      }))
    })
  }
  answerQuestion(response) {
    this.setState(prevState => ({
      questionCount: prevState.questionCount + 1,
      questionAsked: false,
      questions: [
        {...prevState.questions[0], response },
        ...prevState.questions.slice(1),
      ],
    }))
    this.socket.emit('response', response)
  }
  chooseCelebrity(answer) {
    this.socket.emit('choose-answer', answer)
    this.setState({answer})
  }
  gameInProgress() {
    return this.state.answer !== ''
  }
  waitingForQuestion() {
    return !this.state.questionAsked && this.gameInProgress()
  }
  respondingToQuestion() {
    return this.state.questionAsked && this.gameInProgress()
  }
  shouldRenderQuestionList() {
    return this.state.questions.length > 0 && this.gameInProgress()
  }
  render() {
    return (
      <div>
        <Heading size={2}>Chooser</Heading>
        {!this.gameInProgress() &&
          <div>
            <Heading size={3}>Pick a celebrity:</Heading>
            <SingleTextInputForm
              placeholderText='Choose a celebrity...'
              buttonText='Choose'
              onSubmit={(answer) => this.chooseCelebrity(answer)}
            />
          </div>
        }
        {this.gameInProgress() &&
          <Heading size={4}>Questions answered: {this.state.questionCount}</Heading>
        }
        {this.waitingForQuestion() &&
          <Heading size={3}>Waiting for Guesser to ask a question...</Heading>
        }
        {this.respondingToQuestion() &&
          <div>
            <Heading size={3}>Respond to question:</Heading>
            <Heading size={4}>{this.state.questions[0].question}</Heading>
            <MultiButtonForm
              choices={['Yes', 'No']}
              onSubmit={(response) => this.answerQuestion(response)}
            />
          </div>
        }
        {this.shouldRenderQuestionList() &&
          <FilteredQuestionList questions={this.state.questions}/>
        }
      </div>
    )
  }
}
