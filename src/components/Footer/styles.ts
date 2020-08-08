import styled from 'styled-components'
import { colors } from '../../tokens'

const FooterWrapper = styled.footer`
  text-align: left;
  padding-top: 30px;
  padding-bottom: 50px;
  background-color: ${colors.primary};
  color: ${colors.textLightest};
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;

  & nav {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    max-width: 900px;
    margin: 0 auto;

    .footer-col {
      flex: 1 auto;
      display: inline-flex;
      flex-direction: column;
      margin-bottom: 1em;
      padding-right: 1em;
    }
  }

  & a {
    color: ${colors.textLightest};
    font-weight: bold;

    &:hover {
      color: ${colors.textLightestHover};
      /* border-bottom: 1px dotted ${colors.textLightestHover}; */
    }
  }

  .footer-col > p {
    margin: 0;
  }
  .footer-title {
    margin: 0 0 1rem;
  }

  .footer-item {
    padding: 0.25rem 0;
    color: ${colors.textLightest};
  }

  .footer-heart {
    color: ${colors.heartFooter};
  }

  .footer-item-text {
    padding: 0.1rem 0;
    color: ${colors.textLightest};
  }

  .footer-header {
    order: 1;
    margin: 0 0.25rem;
    margin-right: 0.25rem;
    padding: 0.25rem;
  }

  @media (max-width: 564px) {
    .footer-col:first-child {
      width: 100%;
    }
  }
`

export { FooterWrapper }
