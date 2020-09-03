import React from 'react'
import Layout from '../../components/Layout'
import Wrapper from '../../components/Wrapper'
import SEO from '../../components/SEO'
import Hero from '../../components/Hero'
import { Container, Content, MainTitle, Ghost, Text } from './styles'

interface Props {
  location: string
}

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
