import React, { Fragment } from 'react'
import { CategoryContainer, CategoryListItem } from './styles'

interface Props {
  categories: Categories[]
}

const CategoryList = ({ categories }: Props) => {
  return (
    <CategoryContainer>
      {categories.map((category, i) => {
        return (
          <Fragment key={`category-list-${i}`}>
            <CategoryListItem to={`/categories/${category}`}>
              {category}
            </CategoryListItem>
          </Fragment>
        )
      })}
    </CategoryContainer>
  )
}

export default CategoryList
