import React, { Fragment } from 'react'
import PostsListItem from './PostsListItem'
import SearchBox from './SearchBox'

const PostsList = ({
  posts,
  indexOfFirstPost,
  indexOfLastPost,
  searchTerm,
  handleChange,
}) => {
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  return (
    <Fragment>
      <SearchBox searchTerm={searchTerm} handleChange={handleChange} />
      {currentPosts.map(post => {
        const props = {
          title: post.node.frontmatter.title,
          description: post.node.frontmatter.description,
          slug: post.node.frontmatter.slug,
          timeToRead: post.node.timeToRead,
          language: post.node.frontmatter.language || 'fr',
          tags: post.node.frontmatter.tags || [],
        }
        return <PostsListItem key={props.slug} {...props} />
      })}
    </Fragment>
  )
}

export default PostsList
