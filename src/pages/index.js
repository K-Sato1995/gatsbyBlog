import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import Hero from '../components/Hero'
import PostsList from '../components/PostsList'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'

const BlogIndex = ({ data, location }) => {
  const { title, description } = data.site.siteMetadata
  const [searchTerm, setSearchTerm] = useState('')

  const posts = data.posts.edges
  const filterdPosts = posts.filter(post =>
    post.node.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const handleChange = e => {
    e.preventDefault()
    setSearchTerm(e.target.value)
  }
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)
  // The index of the last post on the page.
  const indexOfLastPost = currentPage * postsPerPage
  // The index of the first post on the page.
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  // Total page number
  const totalPageNumber = Math.ceil(filterdPosts.length / postsPerPage)

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
    scrollToTop()
  }
  const previousPage = () => {
    setCurrentPage(currentPage - 1)
    scrollToTop()
  }
  return (
    <Layout location={location}>
      <SEO />
      <Hero title={title} subTitle={description} />

      <Wrapper>
        <PostsList
          indexOfFirstPost={indexOfFirstPost}
          indexOfLastPost={indexOfLastPost}
          posts={filterdPosts}
          searchTerm={searchTerm}
          handleChange={handleChange}
        />
      </Wrapper>

      <Pagination
        totalPageNumber={totalPageNumber}
        currentPage={currentPage}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    posts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//content/posts//" }
        frontmatter: { published: { ne: false } }
      }
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            description
            tags
            language
            slug
          }
        }
      }
    }
  }
`
