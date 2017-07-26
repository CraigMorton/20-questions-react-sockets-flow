import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'

const StyledLink = glamorous(Link, { displayName: 'Link' })({
  color: 'blue',
  ':hover': {
    color: 'blue',
  },
})

const SelectRole = () => (
  <div>
    <p><StyledLink to={'/chooser'}>Play as 'Chooser' - think of a celebrity</StyledLink></p>
    <p><StyledLink to={'/guesser'}>Play as 'Guesser' - ask 20 questions and guess the celebrity</StyledLink></p>
  </div>
)

export default SelectRole
