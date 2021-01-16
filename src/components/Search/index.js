import React, { useState } from 'react'
import SearchResults from './SearchResults'
import { SearchInput, SearchIcon, SearchContainer } from './style'
// import { AiOutlineSearch } from 'react-icons/ai'

const Search = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const onChange = e => {
    setSearchTerm(e.target.value)
  }
  const onFocus = () => {
    setIsFocused(true)
  }
  const onBlur = () => {
    setIsFocused(false)
  }

  return (
    <SearchContainer>
      <SearchIcon />
      <SearchInput
        type="text"
        placeholder="Search for articles..."
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
      <SearchResults isFocused={isFocused} searchTerm={searchTerm} />
    </SearchContainer>
  )
}

export default Search
