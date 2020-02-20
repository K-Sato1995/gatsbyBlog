import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const CategoryContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(214, 209, 230, 0.5);
  padding-bottom: 1.3rem;
`

const CategoryListItem = styled(Link)`
  align-items: center;
  font-size: 0.95rem;
  padding: 0.5rem 0.75rem;
  background: #ebf1fe;
  border-radius: 4px;
  margin-right: 0.6rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #5183f5;
  cursor: pointer;

  &:hover {
    background: #d8e3fd;
    color: #3972f4;
  }
`

class CategoryList extends React.Component {
  render() {
    const { categories } = this.props

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
}

export default CategoryList
