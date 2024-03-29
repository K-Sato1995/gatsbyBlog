import styled from 'styled-components'

const Wrapper = styled.main.attrs({
  role: 'main',
})`
  top: 0;
  left: 0;
  margin: 0 auto;
  display: block;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;

  @media (max-width: 480px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`

export default Wrapper
