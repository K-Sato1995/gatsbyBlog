import React from 'react'
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby'
import useSiteMetadata from '../../hooks/use-site-config'

interface Props {
  title: string
  cover?: any
  description?: string
  imageShare?: any
  isBlogPost?: boolean
  path?: string
  lang?: any
}

const SEO = ({
  title,
  cover,
  description,
  imageShare,
  isBlogPost,
  path,
  lang,
}: Props) => {
  const {
    siteTitle,
    siteUrl,
    siteCover,
    siteDescription,
    twitterUsername,
  } = useSiteMetadata()

  const pageTitle = title ? `${title} | ${siteTitle}` : `${siteTitle}`
  const formatedSiteUrl = siteUrl.endsWith('/')
    ? siteUrl.substring(0, siteUrl.length - 1)
    : siteUrl
  const imagePath = imageShare || cover || withPrefix(siteCover)
  const image = `${formatedSiteUrl}${imagePath}`
  const pageDescription = description || siteDescription

  return (
    <Helmet title={pageTitle}>
      {/* General tags */}
      <html lang={lang} />
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={formatedSiteUrl + withPrefix(path)} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={formatedSiteUrl + withPrefix(path)} />
      <meta property="og:type" content={isBlogPost ? 'article' : 'website'} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO
