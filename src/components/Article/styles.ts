import styled from 'styled-components'

const ArticleContainer = styled.div`
  padding-top: 26px;
  max-width: 100%;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
`

const ArticleContent = styled.div`
  padding: 60px;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 4px;
  position: relative;
  z-index: 3;
  text-decoration: none;
  overflow: hidden;
  width: 100%;
  display: block;
  outline: none;
`

const ArticleFooter = styled.footer`
  position: relative;
  margin: 6rem 0 3rem 0;
  padding: 3rem 0 0;
  border-top: 1px solid #ececec;
`

export { ArticleContainer, ArticleContent, ArticleFooter }
