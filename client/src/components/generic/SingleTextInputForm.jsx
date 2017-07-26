import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class SingleTextInputForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputText: '',
    }
  }
  static propTypes = {
    buttonText: PropTypes.string,
    placeholderText: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
  }
  static defaultProps = {
    buttonText: 'Submit',
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
