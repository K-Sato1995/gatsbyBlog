import React from 'react'
import { TimeContainer } from './styles'

interface Props {
  date: Date
}

const Time = ({ date }: Props) => {
  const dateObject = new Date(date)
  const yyyymmdd = dateObject
    .toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    })
    .split('/')
    .reverse()
    .join('-')
  const friendlyDate = dateObject.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return <TimeContainer datetime={yyyymmdd}>{friendlyDate}</TimeContainer>
}
export default Time
