import React from 'react'
import Flag from '../Flag/Flag'
import TagList from '../TagList'
import useSiteMetadata from '../../hooks/use-site-config'
import { Bull, ReadingTime } from '../Commons'
import Emoji from '../Emoji'
import {
  Post,
  PostHeader,
  Dscription,
  PostTitleLink,
  FooterLine,
  iconStyle,
} from './styles'

interface Props {
  title: string
  slug: string
  description: string
  language: 'english' | 'japanese'
  tags: string[]
  timeToRead: number
  pinned?: boolean
}
const PostsListItem = ({
  title,
  slug,
  description,
  language,
  tags,
  timeToRead,
  pinned,
}: Props) => {
  const { defaultLang } = useSiteMetadata()

  return (
    <Post>
      <PostHeader>
        <h2>
          <PostTitleLink to={`/${slug}`}>
            {defaultLang !== language && <Flag language={language} />}
            {title}
          </PostTitleLink>
          {pinned ? (
            <Emoji symbol="📌" label="Warning" style={iconStyle} />
          ) : (
            <></>
          )}
        </h2>
      </PostHeader>
      <section>
        <Dscription>{description}</Dscription>
      </section>
      <footer>
        <FooterLine>
          <ReadingTime min={timeToRead} />
          <Bull />
          <TagList tags={tags} />
        </FooterLine>
      </footer>
    </Post>
  )
}
export default PostsListItem
