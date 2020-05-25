import React from 'react'
import useSiteMetadata from '../../hooks/use-site-config'
import useSiteImages from '../../hooks/use-site-images'
import { BioWrapper, BioText } from './styles'

const Bio = () => {
  const { authorAvatar, authorName, authorDescription } = useSiteMetadata()
  const { fixed } = useSiteImages(authorAvatar)

  return (
    <BioWrapper>
      <figure className="author-image">
        <div
          alt={authorName}
          style={{ backgroundImage: `url("${fixed.src}")` }}
          className="img"
        />
      </figure>
      <section>
        <h4>About the author</h4>
        <BioText dangerouslySetInnerHTML={{ __html: authorDescription }} />
      </section>
    </BioWrapper>
  )
}

export default Bio
