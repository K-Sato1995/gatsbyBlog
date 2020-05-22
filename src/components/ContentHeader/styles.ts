import styled from 'styled-components'
import { colors } from '../../tokens'

const Header = styled.header`
  color: ${colors.textLight};
  font-size: 0.9em;
`

const EditButton = styled.a`
  float: right;
  margin-top: -2.5px;
  font-size: 0.9em;
`
export { Header, EditButton }
