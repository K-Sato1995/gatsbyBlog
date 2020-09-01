import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Header from '../Header'
import Footer from '../Footer'
import 'prismjs/themes/prism-tomorrow.css'
import { GlobalStyle } from '../Commons'

const SiteContent = styled.div`
  margin: 0 0;
`

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />
      <Header />
      <SiteContent>{children}</SiteContent>
      <Footer />
    </>
  )
}

export default Template
