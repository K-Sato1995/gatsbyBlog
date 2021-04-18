import styled from 'styled-components'
import { colors } from '../../tokens'

const HeroContainer = styled.div`
  background-color: #1f232a;
  padding: 35px 40px 35px 40px;

  @media (max-width: 480px) {
    padding: 25px 20px;
  }
`
const TitleContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 900px;
  z-index: 1000;
`
const HeroSubTitle = styled.h2`
  color: ${colors.white};
  font-size: 28px;
  font-weight: 300;
  margin: 0 0 27px;
`

export { HeroContainer, TitleContainer, HeroSubTitle }
