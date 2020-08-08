import React from 'react'
import {
  PaginationWrapper,
  PreviousBtn,
  NextBtn,
  Spacer,
  PageInfo,
} from './styles'

interface Props {
  currentPage: number
  nbPages: number
}

const Pagination = ({ currentPage, nbPages }: Props) => {
  const previousUrl = currentPage === 2 ? '/' : `/pages/${currentPage - 1}`

  return (
    <PaginationWrapper>
      {currentPage !== 1 ? (
        <PreviousBtn to={previousUrl}>‹ Newer posts</PreviousBtn>
      ) : (
        <Spacer className="previous" />
      )}

      <PageInfo>
        Page {currentPage} of {nbPages}
      </PageInfo>

      {currentPage < nbPages ? (
        <NextBtn to={`/pages/${currentPage + 1}`}>Older posts ›</NextBtn>
      ) : (
        <Spacer className="next" />
      )}
    </PaginationWrapper>
  )
}

export default Pagination
