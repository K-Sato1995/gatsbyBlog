import React, { Fragment } from 'react'
import { ListContainer, TagListItemLink, TagListItem } from './styles'

interface Props {
  tags: string[]
  noLink: boolean
}

const TagList = ({ tags, noLink }: Props) => {
  return (
    <ListContainer>
      {tags.map((tag, i) => {
        return (
          <Fragment key={`tag-list-${i}`}>
            {!noLink && (
              <TagListItemLink to={`/tags/${tag}`}>{tag}</TagListItemLink>
            )}
            {noLink && <TagListItem to={`/tags/${tag}`}>{tag}</TagListItem>}
            {i < tags.length - 1 ? ', ' : ''}
          </Fragment>
        )
      })}
    </ListContainer>
  )
}

export default TagList
