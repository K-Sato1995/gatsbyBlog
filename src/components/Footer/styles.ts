import styled from 'styled-components'
import { Link } from 'gatsby'

const FooterWrapper = styled.footer`
  padding: 40px 0;
  text-align: left;
  font-size: 14px;
  flex-shrink: 0;
  background: #fff;
  color: #a3abb5;
`

const FooterContainer = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
`

const FooterContent = styled.div`
  max-width: 100%;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
`

const FooterLogo = styled.div`
  height: 50px;
  line-height: 30px;
  text-align: center;
  vertical-align: middle;
`

const FooterLogoTitle = styled(Link)`
  color: #909aa5;
  text-decoration: none;
  font-weight: 600;
`

const FooterLinks = styled.div`
  margin-top: 14px;
  margin-bottom: 28px;
`

const FooterLinkList = styled.ul`
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  padding: 0;
  text-align: center;
`

const FooterLink = styled.li`
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
  list-style-type: none;
`

const FooterAnchor = styled.a`
  color: #909aa5;
  text-decoration: none;
`
const FooterAdvert = styled.div`
  text-align: center;
  color: #909aa5;
  font-size: 14px;
`

export {
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
}
