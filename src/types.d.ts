declare module 'gatsby-plugin-mdx/mdx-renderer'

interface Post {
  excerpt?: string
  body: string
  frontmatter: {
    title: string
    date: Date
    slug: string
    language: string
    tags: string[]
    pinned?: boolean
  }
}

type Category =
  | 'Ruby'
  | 'Go'
  | 'JavaScript'
  | 'TypeScript'
  | 'React'
  | 'Rails'
  | 'Life'
  | 'Others'

type HeaderLink = {
  label: string
  url: string
}
