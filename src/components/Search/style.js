import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'

const SearchContainer = styled.div`
  position: relative;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 20px 32px 21px 59px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  &:hover {
    background: rgba(255, 255, 255, 0.27);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);
  }
  &:focus {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.14);
    background: white;
    color: #3a3c4c;
  }
`

const SearchIcon = styled(AiOutlineSearch)`
  width: 22px;
  height: 22px;
  border: none;
  background: transparent;
  color: #767676;
  position: absolute;
  top: 50%;
  left: 19px;
  margin-top: -10px;
  outline: none;
  cursor: pointer;
`

const ResultsWrapper = styled.div`
  .result-inner {
    position: absolute;
    background: #fffeff;
    border-radius: 3px;
    box-shadow: rgba(20, 20, 20, 0.2) 1px 1px 20px;
    width: 520px;
    top: 70px;
    right: calc((100vw - 800px) / 2);
    transition: 0.3s ease;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    color: #617e8c;
    font-size: 0.9rem;
    z-index: 99999;
  }
  .res {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #ddd;
    b {
      padding: 0 3px;
    }
  }
  ul {
    max-height: 210px;
    overflow-y: scroll;
    padding-left: 0em;
    margin: 0em 0px 0px;
    li {
      list-style: none;
      a {
        display: inline-block;
        color: #617e8c;
        padding: 10px 20px;
        width: 100%;
        border-bottom: 1px dashed #ddd;
        z-index: 9999999;
        &:hover {
          color: #617e8c;
          background: #f9f9f9;
          opacity: 1 !important;
        }
      }
      &:last-child {
        a {
          border-bottom: none;
          padding-bottom: 15px;
        }
      }
    }
  }
  &.active {
    .result-inner {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .res,
    ul {
      display: block;
    }
  }
  @media screen and (max-width: 780px) {
    .result-inner {
      width: 95%;
      right: 2.5%;
    }
  }
`

export { SearchContainer, SearchInput, ResultsWrapper, SearchIcon }
