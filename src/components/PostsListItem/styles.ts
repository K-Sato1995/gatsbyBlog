import styled from 'styled-components'
import { colors } from '../../tokens'
import { Link } from 'gatsby'

const Post = styled.article`
  border-bottom: 1px solid rgba(214, 209, 230, 0.5);
  padding-bottom: 2.25rem;
  padding-top: 1.25rem;
`

const PostHeader = styled.header`
  padding: 1em 0;
`

const Dscription = styled.p`
  line-height: 1.45;
  padding-bottom: 0.5em;
`

const PostTitleLink = styled(Link)`
  color: ${colors.primary};
  &:hover {
    border-bottom: 1px dotted ${colors.primary};
  }
`

const FooterLine = styled.div`
  color: ${colors.textLight};
  font-size: 0.8em;
`
const iconStyle = {
  position: 'relative',
  float: 'right',
}

export { Post, PostHeader, Dscription, PostTitleLink, FooterLine, iconStyle }
