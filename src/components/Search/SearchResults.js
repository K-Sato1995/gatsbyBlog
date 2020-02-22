import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import { ResultsWrapper } from './style'

const SearchResults = props => {
  const { searchTerm, isFocused } = props
  const allPosts = useStaticQuery(graphql`
    query SearchData {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fileAbsolutePath: { regex: "//content/posts//" }
          frontmatter: { published: { ne: false } }
        }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              date(formatString: "YYYY-MM-DD")
              slug
              title
            }
          }
        }
      }
    }
  `)
  const [data, setData] = useState([])
  /*Set Initial data*/
  useEffect(() => {
    const temp = []
    allPosts.allMarkdownRemark.edges.forEach(post => {
      temp.push(post.node.frontmatter)
    })
    setData(temp)
  }, [allPosts.allMarkdownRemark.edges])

  /* Change Css class*/
  const [className, setClassName] = useState('')
  useEffect(() => {
    let id
    if (isFocused && searchTerm !== '') {
      id = setTimeout(() => {
        setClassName('active')
      }, 100)
    } else {
      id = setTimeout(() => {
        setClassName('')
      }, 100)
    }
    return () => {
      clearTimeout(id)
    }
  }, [isFocused, searchTerm])

  /*Search Function*/
  const [results, setResults] = useState([])
  useEffect(() => {
    const search = () => {
      const searchedPosts = data.filter(post => {
        return post.title.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setResults(searchedPosts)
    }
    if (searchTerm === '') {
      setResults([])
    } else {
      search()
    }
  }, [searchTerm, data])

  return (
    <ResultsWrapper className={className}>
      <div className="result-inner">
        <span className="res">
          <b>{results.length}</b>Hits
        </span>
        <ul>
          {results.map(result => {
            return (
              <li key={result.slug}>
                <Link to={`/${result.slug}/`}>{result.title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </ResultsWrapper>
  )
}

export default SearchResults
