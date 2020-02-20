import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import get from 'lodash/get'

import Layout from '../components/layout'
import PostsList from '../components/PostsList'
import Wrapper from '../components/Wrapper'
import SEO from '../components/SEO'
import Hero from '../components/Hero'

const PageTitle = styled.h1`
  border-bottom: 1px solid rgba(214, 209, 230, 0.5);
  padding-bottom: 1.3rem;
`

class Tags extends React.Component {
  render() {
    const pageTitle = `#${this.props.pageContext.tag}`
    const posts = get(this, 'props.data.posts.edges')

    return (
      <Layout location={this.props.location}>
        <SEO title={`Top blog posts on ${this.props.pageContext.tag}`} />
        <Hero title={pageTitle} />

        <Wrapper>
          <PageTitle>Posts tagged as {this.props.pageContext.tag}</PageTitle>
          <PostsList posts={posts} />
        </Wrapper>
      </Layout>
    )
  }
}

export default Tags

export const pageQuery = graphql`
  query PostsByTag($tag: String!) {
    posts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { eq: $tag }, published: { ne: false } } }
    ) {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            language
            slug
          }
        }
      }
    }
  }
`
