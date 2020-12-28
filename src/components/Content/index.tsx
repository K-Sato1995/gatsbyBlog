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

const Content = ({ content, rawBody, date }: Props) => {
  return (
    <ContentBody>
      <ContentHeader date={date} />
      <PostOutdatedWarning date={date} />
      <h1>Table of Contents</h1>
      <Toc markdownText={rawBody} type={'raw'} className={'toc'} />
      <MDXRenderer>{content}</MDXRenderer>
    </ContentBody>
  )
}

export default Content
