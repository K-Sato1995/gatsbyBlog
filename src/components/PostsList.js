import React, { Fragment } from 'react'
import PostsListItem from './PostsListItem'

class PostsList extends React.Component {
  render() {
    const { posts, pinnedPosts } = this.props
    return (
      <Fragment>
        {pinnedPosts?.map(post => {
          const props = {
            title: post.node.frontmatter.title,
            description: post.node.frontmatter.description,
            slug: post.node.frontmatter.slug,
            timeToRead: post.node.timeToRead,
            language: post.node.frontmatter.language || 'english',
            tags: post.node.frontmatter.tags || [],
            pinned: post.node.frontmatter.pinned || false,
          }
          return <PostsListItem key={props.slug} {...props} />
        })}
        {posts.map(post => {
          const props = {
            title: post.node.frontmatter.title,
            description: post.node.frontmatter.description,
            slug: post.node.frontmatter.slug,
            timeToRead: post.node.timeToRead,
            language: post.node.frontmatter.language || 'english',
            tags: post.node.frontmatter.tags || [],
          }
          return <PostsListItem key={props.slug} {...props} />
        })}
      </Fragment>
    )
  }
}
export default PostsList
