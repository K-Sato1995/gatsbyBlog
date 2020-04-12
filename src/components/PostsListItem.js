import React from 'react'
import { Link } from 'gatsby'
import Flag from './Flag/Flag'
import TagList from './TagList'
import useSiteMetadata from '../hooks/use-site-config'
import styled from 'styled-components'
import { colors } from '../tokens'
import { Bull, ReadingTime } from './Commons'
import Emoji from './Emoji'

const Post = styled.article`
  border-bottom: 1px solid rgba(214, 209, 230, 0.5);
  padding-bottom: 2.25rem;
  padding-top: 1.25rem;
`

const PostHeader = styled.header`
  padding: 1em 0;
`

const Dscription = styled.p`
  line-height: 1.45;
  padding-bottom: 0.5em;
`

const PostTitleLink = styled(Link)`
  color: ${colors.primary};
  &:hover {
    border-bottom: 1px dotted ${colors.primary};
  }
`

const FooterLine = styled.div`
  color: ${colors.textLight};
  font-size: 0.8em;
`
const iconStyle = {
  position: 'relative',
  float: 'right',
}

const PostsListItem = props => {
  const { title, slug, description, language, tags, timeToRead, pinned } = props
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
