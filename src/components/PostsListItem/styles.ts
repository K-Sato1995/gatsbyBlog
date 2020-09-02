import styled from 'styled-components'
import { Link } from 'gatsby'

const ItemSpace = styled.div`
  margin-top: 16px;
`

const PostBox = styled(Link)`
  background-color: white;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 30px 20px;
  position: relative;
  z-index: 3;
  text-decoration: none;
  overflow: hidden;
  width: 100%;
  display: block;
  outline: none;
  -webkit-box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.03);
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.03);
`

const Collection = styled.div`
  position: relative;
  min-height: 80px;
  padding-left: 150px;
`

const CollectionLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 120px;
  height: 100%;
`

const CollectionRight = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #565867;
  font-weight: 400;
`

const CollectionTitle = styled.h2`
  display: block;
  margin: -5px 0 2px;
  font-size: 18px;
  line-height: 1.24;
  font-weight: 400;
`

const ImageContainer = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  -webkit-transition: stroke 0.1s linear;
  -o-transition: stroke 0.1s linear;
  transition: stroke 0.1s linear;
  top: 50%;
  left: 50%;
  margin: -24px 0 0 -24px;
`
const CollectionDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #656775;
  font-weight: 400;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`

const CollectionFooter = styled.div`
  font-size: 13px;
  color: #8f919d;
  margin-top: 8px;
`

export {
  ItemSpace,
  PostBox,
  Collection,
  CollectionLeft,
  CollectionRight,
  CollectionTitle,
  CollectionDescription,
  CollectionFooter,
  ImageContainer,
}
