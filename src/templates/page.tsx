import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content from '../components/Content'
import Wrapper from '../components/Wrapper'
import Hero from '../components/Hero'
import SEO from '../components/SEO'
import styled from 'styled-components'

const Container = styled.div`
  padding-top: 26px;
  max-width: 100%;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
`

const PageContent = styled.div`
  padding: 60px;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 4px;
  position: relative;
  z-index: 3;
  text-decoration: none;
  overflow: hidden;
  width: 100%;
  display: block;
  outline: none;
`
const Page = (props: any) => {
  const page = props.data.page

  return (
    <Layout location={props.location}>
      <SEO
        title={page.frontmatter.title}
        description={page.excerpt}
        path={page.frontmatter.slug}
        cover={page.frontmatter.cover && page.frontmatter.cover.publicURL}
      />

      <Hero title={page.frontmatter.title} />

      <Wrapper>
        <Container>
          <PageContent>
            <Content content={page.body} date={page.frontmatter.date} />
          </PageContent>
        </Container>
      </Wrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    page: mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
      }
    }
  }
`

export default Page
