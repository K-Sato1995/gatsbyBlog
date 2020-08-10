import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { MainTitle, Ghost, SubTitle } from './design'
import Layout from '../../components/Layout'
import Wrapper from '../../components/Wrapper'
import SEO from '../../components/SEO'
import RelatedPosts from '../../components/RelatedPosts'
import { Text } from '../../components/Commons'

interface Props {
  location: string
}

const NotFoundPage = ({ location }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      posts: allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fileAbsolutePath: { regex: "//content/posts//" }
          frontmatter: { published: { ne: false } }
        }
        limit: 5
      ) {
        edges {
          node {
            excerpt
            frontmatter {
              date(formatString: "DD MMMM, YYYY")
              title
              tags
              language
              slug
            }
          }
        }
      }
    }
  `)

  const posts = data.posts.edges

  return (
    <Layout location={location} noCover={true}>
      <SEO title="Page Not Found" />
      <Wrapper>
        <MainTitle>404 Page Not Found</MainTitle>
        <Ghost role="img" aria-label="Ghost">
          👻
        </Ghost>
        <Text>
          Looks like you've followed a broken link or entered a URL that doesn't
          exist on this site.
        </Text>

        <SubTitle>Recent Posts</SubTitle>

        <RelatedPosts posts={posts} />
      </Wrapper>
    </Layout>
  )
}

export default NotFoundPage
