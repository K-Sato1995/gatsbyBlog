import React, { Fragment } from 'react'
import TagList from '../TagList'
import Time from '../Time'
import { Bull } from '../Commons'
import { Header, EditButton } from './styles'
import Emoji from '../Emoji'
import useSiteMetadata from '../../hooks/use-site-config'

interface Props {
  date: Date
  tags: string[]
  title: string
}

const ContentHeader = ({ date, tags, title }: Props) => {
  const titleLink = title.split(' ').join('-')
  const { postsBaseUrl } = useSiteMetadata()
  return (
    <Header>
      {date && <Time date={date} />}
      {date && Array.isArray(tags) && tags.length > 0 && <Bull />}
      {Array.isArray(tags) && tags.length > 0 && (
        <Fragment>
          <TagList tags={tags} />
        </Fragment>
      )}
      <EditButton
        href={`${postsBaseUrl}/${titleLink}/index.md`}
        target="_blank"
      >
        EDIT THIS POST
        <Emoji symbol="👨🏻‍💻" label="Warning" />
      </EditButton>
    </Header>
  )
}

export default ContentHeader
