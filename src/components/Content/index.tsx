import React from 'react'
import ContentHeader from '../ContentHeader'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import PostOutdatedWarning from '../PostOutdatedWarning'
import { ContentBody } from './styles'
import Toc from 'react-toc'

interface Props {
  content: string
  rawBody: string
  date: Date
}

const tableOfContents = (body?: string) => {
  if (body) return <h1>Table of Contents</h1>

  return <></>
}

const Content = ({ content, rawBody, date }: Props) => {
  const matchers = {
    '[?!()/*~.,]': '',
  }
  return (
    <ContentBody>
      <ContentHeader date={date} />
      <PostOutdatedWarning date={date} />
      {tableOfContents(rawBody)}
      <Toc
        markdownText={rawBody}
        type={'raw'}
        className={'toc'}
        lowestHeadingLevel={3}
        customMatchers={matchers}
      />
      <MDXRenderer>{content}</MDXRenderer>
    </ContentBody>
  )
}

export default Content
