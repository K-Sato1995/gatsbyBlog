import React from 'react'
import Time from '../Time'
import { Bull } from '../Commons'
import { Header } from './styles'

interface Props {
  date: Date
}

const ContentHeader = ({ date }: Props) => {
  return (
    <Header>
      Posted on: <Time date={date} />
      <Bull />
      Written by: K-Sato
    </Header>
  )
}

export default ContentHeader
