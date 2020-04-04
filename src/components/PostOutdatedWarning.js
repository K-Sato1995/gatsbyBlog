import React from 'react'
import styled from 'styled-components'
import Emoji from './Emoji'

const WarningBody = styled.div`
  margin-top: 2rem;
  box-sizing: border-box;
  background-color: #f7f7f7;
  border-left: 5px solid #ffd200;
  padding: 16px;
  border-radius: 0 8px 8px 0;
`

const PostOutdatedWarning = props => {
  const { date } = props
  const today = new Date()
  const postedDate = !date ? new Date() : new Date(date) // For about and experience pages
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
