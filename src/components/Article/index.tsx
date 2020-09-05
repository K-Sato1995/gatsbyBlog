import React from 'react'
import Bio from '../Bio'
import Content from '../Content'
import { ArticleContainer, ArticleContent, ArticleFooter } from './styles'
import Disqus from '../Disqus'

interface Props {
  post: Post
  title: string
  slug: string
}

const Article = ({ post, title, slug }: Props) => {
  return (
    <ArticleContainer>
      <ArticleContent>
        <Content
          content={post.body}
          date={post.frontmatter.date}
          tags={post.frontmatter.tags}
          title={title}
        />
        <ArticleFooter>
          <Bio />
        </ArticleFooter>
        <Disqus slug={slug} title={title} />
      </ArticleContent>
    </ArticleContainer>
  )
}

export default Article
