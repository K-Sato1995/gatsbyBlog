import React from 'react'
import ContentHeader from '../ContentHeader'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import PostOutdatedWarning from '../PostOutdatedWarning'
import { ContentBody } from './styles'

interface Props {
  content: string
  date: Date
  tags: string[]
}

const Content = ({ content, date, tags }: Props) => {
  return (
    <section>
      {(tags || date) && (
        <>
          <ContentHeader date={date} tags={tags} />
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
