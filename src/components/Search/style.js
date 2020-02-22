import styled from 'styled-components'

const SearchContainer = styled.div`
  margin: 15px;
`

const SearchInput = styled.input`
  padding: 4px 10px;
  padding-left: 0.6rem;
  min-width: 42px;
  border-radius: 4px;
  outline: none;
  border: none;
  background-color: #2b2c3c;
  font-size: 0.75rem;
  color: #ffffff;
  font-size: 18px;
  font-weight: 300;
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

export { SearchContainer, SearchInput, ResultsWrapper }
