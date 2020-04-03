import React from 'react'
import styled from 'styled-components'

const WarningBody = styled.div`
  background-color: #ffdc4e;
  color: #533f03;
  padding: 16px;
`

const PostOutdatedWarning = props => {
  const { date } = props
  const today = new Date()
  const postedDate = new Date(date)
  const msDay = 60 * 60 * 24 * 1000
  const gapDays = Math.round(Math.abs(today - postedDate) / msDay)
  const year = Math.floor(gapDays / 365)
  const filer = year === 1 ? `a year go` : `${year} years ago`

  if (year >= 1) {
    return (
      <WarningBody>
        This article was posted over {filer}. The information might be outdated.
      </WarningBody>
    )
  }
  return null
}

export default PostOutdatedWarning
