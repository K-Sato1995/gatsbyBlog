import React from 'react'
import {
  FooterWrapper,
  FooterContainer,
  FooterContent,
  FooterLogo,
  FooterLogoTitle,
  FooterLinks,
  FooterLinkList,
  FooterLink,
  FooterAnchor,
  FooterAdvert,
} from './styles'
import { SiQiita, SiGithub } from 'react-icons/si'
import { FaDev } from 'react-icons/fa'

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterContent>
          <FooterLogo>
            <FooterLogoTitle to="/">K-Sato's Blog</FooterLogoTitle>
          </FooterLogo>

          <FooterLinks>
            <FooterLinkList>
              <FooterLink>
                <FooterAnchor href={'https://github.com/K-Sato1995'}>
                  <SiGithub size={30} />
                </FooterAnchor>
              </FooterLink>

              <FooterLink>
                <FooterAnchor href={'https://qiita.com/k-penguin-sato'}>
                  <SiQiita size={30} />
                </FooterAnchor>
              </FooterLink>

              <FooterLink>
                <FooterAnchor href={'https://dev.to/k_penguin_sato'}>
                  <FaDev size={30} />
                </FooterAnchor>
              </FooterLink>
            </FooterLinkList>
          </FooterLinks>

          <FooterAdvert>
            <>
              Icons made by
              <FooterAnchor
                href="https://www.flaticon.com/free-icon/coding_876019"
                title="Kiranshastry"
              >
                Kiranshastry
              </FooterAnchor>
              from
              <FooterAnchor href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </FooterAnchor>
            </>
          </FooterAdvert>
        </FooterContent>
      </FooterContainer>
    </FooterWrapper>
  )
}

export default Footer
