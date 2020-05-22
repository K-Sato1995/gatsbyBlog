import React from 'react'
import Bio from '../Bio'
import Content from '../Content'
import useSiteMetadata from '../../hooks/use-site-config'
import { ArticleWrapper, ArticleFooter } from './styles'

interface Props {
  post: Post
}

const Article = ({ post }: Props) => {
  const { postsBaseUrl } = useSiteMetadata()
  return (
    <ArticleWrapper>
      <Content
        content={post.body}
        date={post.frontmatter.date}
        tags={post.frontmatter.tags}
      />
      <ArticleFooter>
        <Bio />
      </ArticleFooter>
    </ArticleWrapper>
  )
}

export default Article
