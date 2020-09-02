import React from 'react'
import { Bull, ReadingTime } from '../Commons'
import {
  ItemSpace,
  PostBox,
  Collection,
  CollectionContent,
  CollectionTitle,
  CollectionDescription,
  CollectionFooter,
} from './styles'

interface Props {
  title: string
  slug: string
  description: string
  language: 'english' | 'japanese'
  tags: string[]
  timeToRead: number
  pinned?: boolean
}

const PostsListItem = ({
  title,
  slug,
  description,
  language,
  timeToRead,
  pinned,
}: Props) => {
  return (
    <ItemSpace>
      <PostBox to={`/${slug}`}>
        <Collection>
          <CollectionContent>
            <CollectionTitle>{title}</CollectionTitle>
            <CollectionDescription>{description}</CollectionDescription>
            <CollectionFooter>
              <ReadingTime min={timeToRead} />
              <Bull />
              Lang: {language === 'english' ? 'EN' : 'JA'}
              <Bull />
              Written by: K-Sato
              {pinned ? (
                <>
                  <Bull />
                  <span>Pinned Post</span>
                </>
              ) : null}
            </CollectionFooter>
          </CollectionContent>
        </Collection>
      </PostBox>
    </ItemSpace>
  )
}
export default PostsListItem
