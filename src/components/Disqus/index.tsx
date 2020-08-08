import React from 'react'
import Disqus from 'disqus-react'
import useSiteMetadata from '../../hooks/use-site-config'

interface Props {
  slug: string
  title: string
}

const DisqusWrapper = ({ slug, title }: Props) => {
  const { disqusShortname, disqusSiteUrl } = useSiteMetadata()

  if (!disqusShortname) {
    return null
  }
  const disqusConfig = {
    url: `${disqusSiteUrl}${slug}`,
    title: title,
  }

  return (
    <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
  )
}

export default DisqusWrapper
