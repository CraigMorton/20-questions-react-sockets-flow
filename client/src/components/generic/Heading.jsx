import {createElement} from 'react'

const Heading = ({size, children}) => createElement(`h${size}`, null, children)

export default Heading
