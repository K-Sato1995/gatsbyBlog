import React from 'react'
import ContentHeader from '../ContentHeader'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import PostOutdatedWarning from '../PostOutdatedWarning'
import { ContentBody } from './styles'

interface Props {
  content: string
  date: Date
}

const Content = ({ content, date }: Props) => {
  return (
    <ContentBody>
      <ContentHeader date={date} />
      <PostOutdatedWarning date={date} />
      <MDXRenderer>{content}</MDXRenderer>
    </ContentBody>
  )
}

export default Content
