import styled from 'styled-components'

const Container = styled.div`
  padding-top: 26px;
  max-width: 100%;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
`

const Content = styled.div`
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

const MainTitle = styled.h1`
  line-height: 1.5;
  text-align: center;
  font-size: 3rem;
`

const Ghost = styled.span`
  display: block;
  line-height: 1.5;
  text-align: center;
  font-size: 7rem;
`

const Text = styled.p`
  text-align: center;
`
export { Container, Content, MainTitle, Ghost, Text }
