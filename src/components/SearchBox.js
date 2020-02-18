import React from 'react'
import styled from 'styled-components'

const SearchContainer = styled.div`
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

const SearchBox = ({ searchTerm, handleChange }) => {
  return (
    <SearchContainer>
      <Input
        type="text"
        key="editor1"
        id="searchTerm"
        name="searchTerm"
        placeholder="Type here to filter posts"
        value={searchTerm}
        onChange={handleChange}
      />
    </SearchContainer>
  )
}

export default SearchBox
