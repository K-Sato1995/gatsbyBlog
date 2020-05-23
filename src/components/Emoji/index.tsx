import React from 'react'

interface Props {
  style?: any
  label: string
  symbol: any
}

const Emoji = ({ style, label, symbol }: Props) => (
  <span
    className="emoji"
    role="img"
    style={style}
    aria-label={label ? label : ''}
    aria-hidden={label ? 'false' : 'true'}
  >
    {symbol}
  </span>
)
export default Emoji
