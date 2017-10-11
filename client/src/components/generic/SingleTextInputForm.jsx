import React, {Component} from 'react'

export default class SingleTextInputForm extends Component {

  static defaultProps = {buttonText: 'Submit'}
  constructor(props) {
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
