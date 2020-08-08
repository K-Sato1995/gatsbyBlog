import React from 'react'
import { StyledLink } from '../Commons'
import Flag from '../Flag/Flag'
import useSiteMetadata from '../../hooks/use-site-config'

interface Props {
  posts: any
}

const RelatedPosts = ({ posts }: Props) => {
  const { defaultLang } = useSiteMetadata()

  return (
    <ul>
      {posts.map((post: any) => {
        const title = post.node.frontmatter.title
        const slug = post.node.frontmatter.slug
        const language = post.node.frontmatter.language || defaultLang
        return (
          <li key={slug}>
            <StyledLink to={`/${slug}`}>
              {defaultLang !== language && <Flag language={language} />}
              {title}
            </StyledLink>
          </li>
        )
      })}
    </ul>
  )
}
export default RelatedPosts
