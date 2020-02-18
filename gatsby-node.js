const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const BlogPostTemplate = require.resolve('./src/templates/blog-post.js')
  const BlogPostShareImage = require.resolve(
    './src/templates/blog-post-share-image.js'
  )
  const PageTemplate = require.resolve('./src/templates/page.js')
  const PostsBytagTemplate = require.resolve('./src/templates/tags.js')

  const allMarkdownQuery = await graphql(`
    {
      allMarkdown: allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { published: { ne: false } } }
        limit: 1000
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              slug
              tags
              language
            }
            timeToRead
            excerpt
          }
        }
      }
    }
  `)

  if (allMarkdownQuery.errors) {
    reporter.panic(allMarkdownQuery.errors)
  }

  // All markdonw files under content dir including about.md and experience.md.
  const markdownFiles = allMarkdownQuery.data.allMarkdown.edges

  // Markdown files under /content/posts/.
  markdownFiles
    .filter(item => item.node.fileAbsolutePath.includes('/content/posts/'))
    .forEach((post, index, posts) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.frontmatter.slug,
        component: BlogPostTemplate,
        context: {
          slug: post.node.frontmatter.slug,
          previous,
          next,
        },
      })

      if (process.env.gatsby_executing_command.includes('develop')) {
        createPage({
          path: `${post.node.frontmatter.slug}/image_share`,
          component: BlogPostShareImage,
          context: {
            slug: post.node.frontmatter.slug,
            width: 440,
            height: 220,
          },
        })
      }
    })

  // generate pages
  // (= createing pages from md files under /content/pages)
  markdownFiles
    .filter(item => item.node.fileAbsolutePath.includes('/content/pages/'))
    .forEach(page => {
      createPage({
        path: page.node.frontmatter.slug,
        component: PageTemplate,
        context: {
          slug: page.node.frontmatter.slug,
        },
      })
    })

  // generate tags
  markdownFiles
    .filter(item => item.node.frontmatter.tags !== null)
    .reduce(
      (acc, cur) => [...new Set([...acc, ...cur.node.frontmatter.tags])],
      []
    )
    .forEach(uniqTag => {
      createPage({
        path: `tags/${uniqTag}`,
        component: PostsBytagTemplate,
        context: {
          tag: uniqTag,
        },
      })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
