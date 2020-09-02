import styled from 'styled-components'

const Wrapper = styled.main.attrs({
  role: 'main',
})`
  max-width: 100%;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 26px;

  @media (max-width: 780px) {
    width: 100%;
    padding: 25px;
  }
`

export default Wrapper
