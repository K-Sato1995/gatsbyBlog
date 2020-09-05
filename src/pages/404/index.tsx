import React from 'react'
import Layout from '../../components/Layout'
import Wrapper from '../../components/Wrapper'
import SEO from '../../components/SEO'
import Hero from '../../components/Hero'
import styled from 'styled-components'

interface Props {
  location: string
}

const Container = styled.div`
  padding-top: 26px;
  max-width: 100%;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
`

const Content = styled.div`
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

const MainTitle = styled.h1`
  line-height: 1.5;
  text-align: center;
  font-size: 3rem;
`

const Ghost = styled.span`
  display: block;
  line-height: 1.5;
  text-align: center;
  font-size: 7rem;
`

const Text = styled.p`
  text-align: center;
`

const NotFoundPage = ({ location }: Props) => {
  return (
    <Layout location={location} noCover={true}>
      <SEO title="Page Not Found" />
      <Hero title="404 Page Not Found" />

      <Wrapper>
        <Container>
          <Content>
            <MainTitle>404 Page Not Found</MainTitle>
            <Ghost role="img" aria-label="Ghost">
              👻
            </Ghost>
            <Text>
              Looks like you've followed a broken link or entered a URL that
              doesn't exist on this site.
            </Text>
          </Content>
        </Container>
      </Wrapper>
    </Layout>
  )
}

export default NotFoundPage
