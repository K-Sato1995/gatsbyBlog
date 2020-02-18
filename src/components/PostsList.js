import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import PostsListItem from './PostsListItem'

const PostsList = ({
  posts,
  indexOfFirstPost,
  indexOfLastPost,
  searchTerm,
  handleChange,
}) => {
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const SearchBox = styled.div`
    border-bottom: 1px solid rgba(214, 209, 230, 0.5);
    padding-bottom: 1.5rem;
  `
  const Input = styled.input`
    -webkit-appearance: textfield;
    width: 100%;
    color: inherit;
    background-color: var(--theme-ui-colors-background, #fff);
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 0.94rem;
    font-family: inherit;
    border-color: var(--theme-ui-colors-muted, #dae1e3);
    border-style: solid;
    border-width: 1.5px;
    border-radius: 6px;
    outline: 0px solid;
    opacity: 0.9;
  `
  return (
    <Fragment>
      <SearchBox>
        <Input
          placeholder="Type here to filter posts"
          value={searchTerm}
          onChange={handleChange}
        />
      </SearchBox>
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
