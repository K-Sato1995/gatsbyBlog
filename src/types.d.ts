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
