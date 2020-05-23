import React from 'react'
import ContentHeader from '../ContentHeader'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import PostOutdatedWarning from '../PostOutdatedWarning'
import { ContentBody } from './styles'

interface Props {
  content: string
  date: Date
  tags: string[]
  title: string
}

const Content = ({ content, date, tags, title }: Props) => {
  return (
    <section>
      {(tags || date) && (
        <>
          <ContentHeader date={date} tags={tags} title={title} />
        </>
      )}

      <ContentBody>
        <PostOutdatedWarning date={date} />
        <MDXRenderer>{content}</MDXRenderer>
      </ContentBody>
    </section>
  )
}

export default Content
