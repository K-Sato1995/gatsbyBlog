import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'
import Hero from '../components/Hero'
import PostsList from '../components/PostsList'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'

class BlogList extends React.Component {
  render() {
    const { subTitle } = this.props.data.site.siteMetadata
    const posts = this.props.data.posts.edges
    const pinnedPosts = this.props.data.pinnedPosts.edges
    const { pageContext } = this.props

    return (
      <Layout location={this.props.location}>
        <SEO />
        <Hero title={subTitle} />

        <Wrapper>
          <PostsList posts={posts} pinnedPosts={pinnedPosts} />
        </Wrapper>

        <Pagination
          nbPages={pageContext.nbPages}
          currentPage={pageContext.currentPage}
        />
      </Layout>
    )
  }
}

export default BlogList

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        subTitle
        description
      }
    }
    pinnedPosts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//content/posts//" }
        frontmatter: { published: { ne: false }, pinned: { eq: true } }
      }
      limit: 3
      skip: $skip
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            description
            category
            language
            slug
            pinned
          }
        }
      }
    }

    posts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//content/posts//" }
        frontmatter: { published: { ne: false }, pinned: { ne: true } }
      }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            category
            description
            language
            slug
          }
        }
      }
    }
  }
`
