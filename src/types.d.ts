declare module 'gatsby-plugin-mdx/mdx-renderer'

interface Post {
  excerpt?: string
  body: string
  rawBody: string
  frontmatter: {
    title: string
    date: Date
    slug: string
    language: string
    pinned?: boolean
  }
}

type Category = 'Programming' | 'Resources' | 'BookReport' | 'Memo' | 'Life'

type HeaderLink = {
  label: string
  url: string
}
