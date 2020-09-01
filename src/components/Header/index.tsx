/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react'
import useSiteMetadata from '../../hooks/use-site-config'
import {
  HeaderWrapper,
  HeaderNav,
  HeaderLinksContainer,
  HeaderLink,
  HeaderLinkTitle,
  HeaderLinkTitleContent,
  MobilePanel,
  MobileNav,
  BurgerButton,
  BurgerContent,
} from './styles'

interface Props {
  headerLinks: HeaderLink[]
}

const HeaderLinks = ({ headerLinks }: Props) => {
  return headerLinks.map((headerLink, i) => (
    <HeaderLink
      to={headerLink.url}
      key={`header-link-${i}`}
      aria-label={`View ${headerLink.label} page`}
    >
      {headerLink.label}
    </HeaderLink>
  ))
}

const MobileHeader = ({ headerLinks }: Props) => {
  const [isToggledOn, setToggle] = useState(false)
  const toggle = () => setToggle(!isToggledOn)

  return (
    <>
      <BurgerButton
        onClick={toggle}
        aria-label={`${isToggledOn ? 'close menu' : 'open menu'}`}
      >
        <BurgerContent isToggledOn={isToggledOn} />
      </BurgerButton>
      {isToggledOn && (
        <MobilePanel>
          <MobileNav>
            <HeaderLinks headerLinks={headerLinks} />
          </MobileNav>
        </MobilePanel>
      )}
    </>
  )
}

const Header = () => {
  const { headerLinks, headerTitle } = useSiteMetadata()
  return (
    <HeaderWrapper>
      <HeaderNav>
        <HeaderLinkTitle to={`/`} aria-label={`View home page`}>
          <HeaderLinkTitleContent>{headerTitle}</HeaderLinkTitleContent>
        </HeaderLinkTitle>
        <HeaderLinksContainer>
          <HeaderLinks headerLinks={headerLinks} />
        </HeaderLinksContainer>
        <MobileHeader headerLinks={headerLinks} />
      </HeaderNav>
    </HeaderWrapper>
  )
}

export default Header
