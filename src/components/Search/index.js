import React, { useState } from 'react'
import SearchResults from './SearchResults'
import { SearchContainer, SearchInput } from './style'

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
      <SearchInput
        type="text"
        placeholder="Search"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
      <SearchResults isFocused={isFocused} searchTerm={searchTerm} />
    </SearchContainer>
  )
}

export default Search
