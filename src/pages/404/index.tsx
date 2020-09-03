import React from 'react'
import Layout from '../../components/Layout'
import Wrapper from '../../components/Wrapper'
import SEO from '../../components/SEO'
import { Text } from '../../components/Commons'
import styled from 'styled-components'

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

interface Props {
  location: string
}

const NotFoundPage = ({ location }: Props) => {
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
      </Wrapper>
    </Layout>
  )
}

export default NotFoundPage
