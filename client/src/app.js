import {createElement} from 'react'
import {render} from 'react-dom'
import RouterWrapper from './routing/RouterWrapper'
/* eslint-disable no-unused-vars */
import __styles from './styles/global.css'
/* eslint-enable no-unused-vars */

window.addEventListener('load', () => {
  render(
    createElement(RouterWrapper),
    document.getElementById('app')
  )
})
