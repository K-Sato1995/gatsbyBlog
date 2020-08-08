import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import get from 'lodash/get'

import Layout from '../components/Layout'
import PostsList from '../components/PostsList'
import Wrapper from '../components/Wrapper'
import SEO from '../components/SEO'
import Hero from '../components/Hero'

const PageTitle = styled.h1`
  border-bottom: 1px solid rgba(214, 209, 230, 0.5);
  padding-bottom: 1.3rem;
`

class Categories extends React.Component {
  render() {
    const pageTitle = `${this.props.pageContext.category}`
    const posts = get(this, 'props.data.posts.edges')

    return (
      <Layout location={this.props.location}>
        <SEO title={`Top blog posts on ${this.props.pageContext.category}`} />
        <Hero title={pageTitle} />

        <Wrapper>
          <PageTitle>
            Posts categorized as {this.props.pageContext.category}
          </PageTitle>
          <PostsList posts={posts} />
        </Wrapper>
      </Layout>
    )
  }
}

export default Categories

export const pageQuery = graphql`
  query PostsByCategory($category: String!) {
    posts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { category: { eq: $category }, published: { ne: false } }
      }
    ) {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            category
            tags
            language
            slug
          }
        }
      }
    }
  }
`
