import React from 'react'
import { Link } from 'gatsby'
import useSiteMetadata from '../../hooks/use-site-config'
import { FooterWrapper } from './styles'

interface FooterItem {
  url: string
  label: string
}

interface Column {
  sectionName: string
  links: FooterItem[]
}

const Footer = () => {
  const { authorName, websiteHost, footerLinks } = useSiteMetadata()

  const FooterItem = ({ item }: { item: FooterItem }) => {
    if (item.url.startsWith('/')) {
      return (
        <span className="footer-item">
          <Link className="footer-link" to={item.url}>
            {item.label}
          </Link>
        </span>
      )
    }
    return (
      <span className="footer-item">
        <a className="footer-link" href={item.url}>
          {item.label}
        </a>
      </span>
    )
  }

  const FooterColumn = ({ column }: { column: Column }) => {
    return (
      <div className="footer-col">
        <h5 className="footer-title" key={column.sectionName}>
          {column.sectionName}
        </h5>
        {column.links.map((item: FooterItem, i: number) => {
          return <FooterItem item={item} key={`footer-column-item-${i}`} />
        })}
      </div>
    )
  }

  return (
    <FooterWrapper>
      <nav>
        <div className="footer-col">
          <h5 className="footer-title">
            {authorName} © {new Date().getFullYear()}
          </h5>
          <p className="footer-item-text">
            Built with{' '}
            <a className="footer-link" href="https://www.gatsbyjs.org">
              Gatsby
            </a>
            .
          </p>
          <p className="footer-item-text">
            Theme using{' '}
            <a
              className="footer-link"
              href="https://github.com/maxpou/gatsby-starter-morning-dew"
            >
              gatsby-starter-morning-dew
            </a>
            .
          </p>
          <p className="footer-item-text">
            Hosted with{' '}
            <span className="footer-heart" role="img" aria-label="Love">
              ❤
            </span>{' '}
            by{' '}
            <a className="footer-link" href={websiteHost.url}>
              {websiteHost.name}
            </a>
            .
          </p>
        </div>
        {footerLinks.map((column: Column, i: number) => {
          return <FooterColumn column={column} key={`footer-column-${i}`} />
        })}
      </nav>
    </FooterWrapper>
  )
}

export default Footer
