import {createElement} from 'react'

type Props = {
  size: number,
  children: Array<JSX.Element>,
}

export default function Heading({
  size,
  children,
}: Props): JSX.Element {
  return createElement(`h${size}`, null, children)
}
