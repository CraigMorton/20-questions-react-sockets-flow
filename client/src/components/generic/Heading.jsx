import {createElement} from 'react'

export default function Heading({
  size,
  children,
}) {
  return createElement(`h${size}`, null, children)
}
