import React, {Component} from 'react'

type State = {inputText: string}
type Props = {
  buttonText: ?string,
  placeholderText: ?string,
  onSubmit: Function,
}
type DefaultProps = {buttonText: 'Submit'}

export default class SingleTextInputForm extends Component<
DefaultProps,
Props,
State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      inputText: '',
    }
  }
  handleChange(event) {
    this.setState({inputText: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    this.setState({inputText: ''})
    this.props.onSubmit(this.state.inputText)
  }
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input
          type='text'
          placeholder={this.props.placeholderText}
          onChange={(e) => this.handleChange(e)}
        />
        <input type='submit' value={this.props.buttonText}/>
      </form>
    )
  }
}
