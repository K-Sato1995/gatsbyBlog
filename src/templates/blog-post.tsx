import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import Hero from '../components/Hero'
import Article from '../components/Article'
import SEO from '../components/SEO'
import Disqus from '../components/Disqus'

interface Props {
  data: { post: Post }
  location: string
}

const BlogPostTemplate = ({ data, location }: Props) => {
  const { post } = data
  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        lang={post.frontmatter.language}
        path={post.frontmatter.slug}
        isBlogPost
      />

      <Hero title={post.frontmatter.title} />

      <Wrapper>
        <Article post={post} />
      </Wrapper>

      <Wrapper>
        <Disqus slug={post.frontmatter.slug} title={post.frontmatter.title} />
      </Wrapper>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    post: mdx(frontmatter: { slug: { eq: $slug } }) {
      excerpt
      body
      frontmatter {
        title
        date
        slug
        language
        tags
      }
    }
  }
`
