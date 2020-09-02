import React from 'react'
import { StyledLink } from '../Commons'

interface Props {
  posts: any
}

const RelatedPosts = ({ posts }: Props) => {
  return (
    <ul>
      {posts.map((post: any) => {
        const title = post.node.frontmatter.title
        const slug = post.node.frontmatter.slug
        return (
          <li key={slug}>
            <StyledLink to={`/${slug}`}>{title}</StyledLink>
          </li>
        )
      })}
    </ul>
  )
}
export default RelatedPosts
