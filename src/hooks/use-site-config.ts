import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const result = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteTitle
          siteSubTitle
          siteUrl
          siteCover
          authorName
          authorAvatar
          authorDescription
          siteDescription
          twitterUsername
          disqusShortname
          disqusSiteUrl
          defaultLang
          headerTitle
          headerLinksIcon
          postsBaseUrl
          headerLinks {
            label
            url
          }
          websiteHost {
            name
            url
          }
        }
      }
    }
  `)
  return result.site.siteMetadata
}

export default useSiteMetadata
