/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react'
import useSiteMetadata from '../../hooks/use-site-config'
import useSiteImages from '../../hooks/use-site-images'
import Search from '../Search'
import {
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
  const {
    headerLinks,
    siteTitle,
    headerTitle,
    headerLinksIcon,
  } = useSiteMetadata()
  const iconSrc = headerLinksIcon
    ? useSiteImages(headerLinksIcon).fluid.src
    : null

  return (
    <HeaderWrapper>
      <HeaderNav>
        <HeaderLinkTitle to={`/`} aria-label={`View home page`}>
          {iconSrc && <HeaderImage src={iconSrc} alt={siteTitle} />}
          <HeaderLinkTitleContent>{headerTitle}</HeaderLinkTitleContent>
        </HeaderLinkTitle>
        <HeaderLinksContainer>
          <HeaderLinks headerLinks={headerLinks} />
          <HeaderExternalLink
            href="https://github.com/K-Sato1995/gatsbyBlog/issues"
            target="_blank"
          >
            Submit Issues📝
          </HeaderExternalLink>
          <Search />
        </HeaderLinksContainer>
        <MobileHeader headerLinks={headerLinks} />
      </HeaderNav>
    </HeaderWrapper>
  )
}

export default Header
