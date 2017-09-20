import React, { Component } from 'react'
import io from 'socket.io-client'
import Heading from '../components/generic/Heading'
import QuestionList from '../components/QuestionList'
import QuestionForm from '../components/QuestionForm'
import FinalQuestionForm from '../components/FinalQuestionForm'

type Props = {}
type State = {
  answerChosen: bool,
  waitingForAnswer: bool,
  questionCount: number,
  questions: Array<Object>,
};
export default class GuesserContainer extends Component<void, Props, State> {
  static defaultProps = {

  }

  static propTypes = {

  }
  constructor() {
    super()

    this.state = {
      answerChosen: false,
      waitingForAnswer: false,
      questionCount: 0,
      questions: [],
    }

    this.socket = io()
    this.socketSetupOnAnswerChosen()
    this.socketSetupOnQuestionResponse()
  }
  socketSetupOnAnswerChosen() {
    this.socket.on('answer-chosen', () => {
      this.setState({ answerChosen: true })
    })
  }
  socketSetupOnQuestionResponse() {
    this.socket.on('response', (response) => {
      this.setState(prevState => ({
        waitingForAnswer: false,
        questionCount: prevState.questionCount + 1,
        questions: [
          { ...prevState.questions[0], response },
          ...prevState.questions.slice(1),
        ],
      }))
    })
  }
  askQuestion(question) {
    this.setState(prevState => ({
      waitingForAnswer: true,
      questions: [
        { question: question, response: null },
        ...prevState.questions,
      ],
    }))
    this.socket.emit('question', question)
  }
  gameStarted() {
    return this.state.answerChosen
  }
  gameInProgress() {
    return this.gameStarted() && !this.finalQuestion()
  }
  finalQuestion() {
    return this.state.questionCount >= 19 && this.gameStarted()
  }
  waitingForQuestionResponse() {
    return this.state.waitingForAnswer && this.gameInProgress()
  }
  askingQuestion() {
    return !this.state.waitingForAnswer && this.gameInProgress()
  }
  shouldRenderQuestionList() {
    return this.state.questions.length > 0 && this.gameStarted()
  }
  render() {
    return (
      <div>
        <Heading size={2}>Guesser</Heading>
        {!this.gameStarted() &&
          <Heading size={3}>Waiting for Chooser to choose an answer...</Heading>
        }
        {this.waitingForQuestionResponse() &&
          <Heading size={3}>Waiting for Chooser to answer question...</Heading>
        }
        {this.gameStarted() &&
          <Heading size={4}>Questions asked: {this.state.questionCount}</Heading>
        }
        {this.finalQuestion() &&
          <FinalQuestionForm onSubmit={(question) => this.askQuestion(question)} />
        }
        {this.askingQuestion() &&
          <QuestionForm onSubmit={(question: string) => this.askQuestion(question)} />
        }
        {this.shouldRenderQuestionList() &&
          <QuestionList questions={this.state.questions} />
        }
      </div>
    )
  }
}
