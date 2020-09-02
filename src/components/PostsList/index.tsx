import React, { Fragment } from 'react'
import PostsListItem from '../PostsListItem'
import { PostListContent } from './styles'

interface Props {
  posts: any
  pinnedPosts: any
}

const PostsList = ({ posts, pinnedPosts }: Props) => {
  return (
    <PostListContent>
      {pinnedPosts?.map((post: any) => {
        const props = {
          title: post.node.frontmatter.title,
          description: post.node.frontmatter.description,
          slug: post.node.frontmatter.slug,
          category: post.node.frontmatter.category,
          timeToRead: post.node.timeToRead,
          language: post.node.frontmatter.language || 'english',
          tags: post.node.frontmatter.tags || [],
          pinned: post.node.frontmatter.pinned || false,
        }
        return <PostsListItem key={props.slug} {...props} />
      })}
      {posts.map((post: any) => {
        const props = {
          title: post.node.frontmatter.title,
          description: post.node.frontmatter.description,
          slug: post.node.frontmatter.slug,
          category: post.node.frontmatter.category,
          timeToRead: post.node.timeToRead,
          language: post.node.frontmatter.language || 'english',
          tags: post.node.frontmatter.tags || [],
        }
        return <PostsListItem key={props.slug} {...props} />
      })}
    </PostListContent>
  )
}
export default PostsList
