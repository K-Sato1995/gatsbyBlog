import React from 'react'
import { Bull, ReadingTime } from '../Commons'
import {
  ItemSpace,
  PostBox,
  Collection,
  CollectionLeft,
  CollectionRight,
  CollectionTitle,
  CollectionDescription,
  CollectionFooter,
  ImageContainer,
} from './styles'
import SvgProgramming from '../Svgs/SvgProgramming'
import SvgList from '../Svgs/SvgList'
import SvgLife from '../Svgs/SvgLife'
import SvgMemo from '../Svgs/SvgMemo'
import SvgBookReport from '../Svgs/SvgBookReport'

interface Props {
  title: string
  slug: string
  description: string
  category: category
  language: 'english' | 'japanese'
  tags: string[]
  timeToRead: number
  pinned?: boolean
}

const PostImage = (data: { category: category }) => {
  switch (data.category) {
    case 'Programming':
      return <SvgProgramming />
    case 'Resources':
      return <SvgList />
    case 'BookReport':
      return <SvgBookReport />
    case 'Memo':
      return <SvgMemo />
    case 'Life':
      return <SvgLife />
    default:
      return <SvgProgramming />
  }
}

const PostsListItem = ({
  title,
  slug,
  description,
  language,
  category,
  timeToRead,
  pinned,
}: Props) => {
  console.log(category)
  return (
    <ItemSpace>
      <PostBox to={`/${slug}`}>
        <Collection>
          <CollectionLeft>
            <ImageContainer>
              <PostImage category={category} />
            </ImageContainer>
          </CollectionLeft>

          <CollectionRight>
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
          </CollectionRight>
        </Collection>
      </PostBox>
    </ItemSpace>
  )
}
export default PostsListItem
