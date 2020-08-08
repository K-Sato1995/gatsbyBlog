import { Link } from 'gatsby'
import styled from 'styled-components'
import { colors } from '../../tokens'

const ListContainer = styled.div`
  display: inline;
  color: ${colors.postMetadata};
`

const TagListItemLink = styled(Link)`
  text-transform: uppercase;
  color: ${colors.postMetadata};

  &:not(:first-child) {
    margin-left: 0.3rem;
  }

  &:hover {
    border-bottom: 1px dotted ${colors.textLight};
  }
  &:before {
    content: '#';
  }
`

const TagListItem = styled.span`
  text-transform: uppercase;
  color: ${colors.postMetadata};
  &:not(:first-child) {
    margin-left: 0.3rem;
  }
  &:before {
    content: '#';
  }
`

export { ListContainer, TagListItemLink, TagListItem }
