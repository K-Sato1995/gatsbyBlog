import React from 'react'
import Emoji from '../Emoji'
import { WarningBody } from './styles'

interface Props {
  date: Date
}

const PostOutdatedWarning = ({ date }: Props) => {
  const today: any = new Date()
  const postedDate: any = !date ? new Date() : new Date(date) // For about and experience pages
  const msDay = 60 * 60 * 24 * 1000
  const gapDays = Math.round(Math.abs(today - postedDate) / msDay)
  const year = Math.floor(gapDays / 365)
  const filer = year === 1 ? `a year go` : `${year} years ago`

  if (year >= 1) {
    return (
      <WarningBody>
        <Emoji symbol="⚠️" label="Warning" /> This article was posted over{' '}
        {filer}. The information might be outdated.{' '}
        <Emoji symbol="⚠️" label="Warning" />
      </WarningBody>
    )
  }
  return null
}

export default PostOutdatedWarning
