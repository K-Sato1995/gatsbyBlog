import React from 'react'
import Bio from '../Bio'
import Content from '../Content'
import { ArticleWrapper, ArticleFooter } from './styles'

interface Props {
  post: Post
  tite: string
}

const Article = ({ post, title }: Props) => {
  return (
    <ArticleWrapper>
      <Content
        content={post.body}
        date={post.frontmatter.date}
        tags={post.frontmatter.tags}
        title={title}
      />
      <ArticleFooter>
        <Bio />
      </ArticleFooter>
    </ArticleWrapper>
  )
}

export default Article
