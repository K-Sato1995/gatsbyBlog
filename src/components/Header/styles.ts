import { Link } from 'gatsby'
import styled from 'styled-components'
import { colors, media } from '../../tokens'

const HeaderWrapper = styled.header`
  top: 0;
  left: 0;
  margin: 0 auto;
  display: block;
  width: 100%;
  z-index: 1000;
  background-color: ${colors.primaryAlpha};
  font-weight: 700;

  @media ${media.medium} {
    position: fixed;
  }
`

const HeaderNav = styled.nav`
  font-weight: 700;
  margin-left: auto;
  margin-right: auto;
  height: 60px;
  display: flex;
  flex-direction: row;
  max-width: 800px;
  z-index: 1000;
  justify-content: space-between;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0px 20px;
`

const HeaderLinksContainer = styled.div`
  display: none;
  -webkit-box-align: center;
  align-items: center;
  @media ${media.medium} {
    display: flex;
  }
`

const HeaderLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  color: ${colors.textLightest};
  border: 0;
  margin: 0;
  padding: 8px 10px;

  min-width: 42px;
  z-index: 10;
  & + & {
    margin-left: 0.7rem;
  }
`

const HeaderExternalLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  color: ${colors.textLightest};
  border: 0;
  margin: 0;
  padding: 8px 10px;

  min-width: 42px;
  z-index: 10;
  & + & {
    margin-left: 0.7rem;
  }
`

const HeaderLinkTitle = styled(HeaderLink)`
  padding-left: 0;
`

const HeaderLinkTitleContent = styled.span`
  display: block;
  padding-left: 0;
`

const HeaderImage = styled.img`
  padding: 4px;
  height: 57px;
`

const MobilePanel = styled.div`
  position: absolute;
  z-index: 20;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${colors.primary};
  @media ${media.medium} {
    display: none;
  }
`

const MobileNav = styled.nav`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  justify-content: space-evenly;
  margin: 0px auto;

  & a {
    display: flex;
    margin: 10px 0 !important;
  }
`

const BurgerButton = styled.button`
  z-index: 30;
  top: 0px;
  position: relative;
  color: ${colors.textLightest};
  display: flex;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  @media ${media.medium} {
    display: none;
  }
`

const BurgerContent = styled.div`
  width: 24px;
  height: 2px;
  background: ${colors.textLightest};
  position: absolute;
  left: 0;
  ${props =>
    props.isToggledOn
      ? 'background: transparent'
      : `background: ${colors.textLightest}`};
  transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
  ::before {
    content: '';
    top: -8px;
    width: 24px;
    height: 2px;
    background: ${colors.textLightest};
    position: absolute;
    left: 0;
    ${props =>
      props.isToggledOn
        ? 'transform: rotate(45deg); top: 0;'
        : 'transform: rotate(0)'};
    transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
  }
  ::after {
    top: 8px;
    content: '';
    width: 24px;
    height: 2px;
    background: white;
    position: absolute;
    left: 0;
    ${props =>
      props.isToggledOn
        ? 'transform: rotate(-45deg); top: 0;'
        : 'transform: rotate(0)'};
    transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
  }
`

export {
  HeaderWrapper,
  HeaderNav,
  HeaderLinksContainer,
  HeaderLink,
  HeaderExternalLink,
  HeaderLinkTitle,
  HeaderLinkTitleContent,
  HeaderImage,
  MobilePanel,
  MobileNav,
  BurgerButton,
  BurgerContent,
}