module.exports = {
  siteTitle: "K-Sato's Blog",
  siteDescription: 'This is my blog',
  authorName: 'K-Sato',
  twitterUsername: 'k-sato',
  authorAvatar: 'avatar.png', // file in content/images
  defaultLang: 'en', // show flag if lang is not default. Leave empty to enable flags in post lists
  authorDescription: `K-Sato yade`,
  siteUrl: '',
  disqusSiteUrl: 'https://k-sato-blog',
  // Prefixes all links. For cases when deployed to maxpou.fr/gatsby-starter-morning-dew/
  pathPrefix: '/k-sato', // Note: it must *not* have a trailing slash.
  siteCover: 'background.jpeg', // file in content/images
  googleAnalyticsId: '',
  background_color: '#ffffff',
  theme_color: '#222222',
  display: 'standalone',
  icon: 'content/images/avatar.png',
  postsPerPage: 6,
  disqusShortname: 'k-sato-blog',
  headerTitle: 'K-Sato',
  headerLinksIcon: 'avatar.png', //  (leave empty to disable: '')
  headerLinks: [
    {
      label: 'Blog',
      url: '/',
    },
    {
      label: 'About',
      url: '/about',
    },
    {
      label: 'Installation',
      url: '/how-to-install',
    },
  ],
  websiteHost: {
    name: 'GitHub',
    url: 'https://github.com',
  },
  footerLinks: [
    {
      sectionName: 'Explore',
      links: [
        {
          label: 'Blog',
          url: '/',
        },
        {
          label: 'About',
          url: '/about',
        },
        {
          label: 'Installation',
          url: '/how-to-install',
        },
      ],
    },
    {
      sectionName: 'Follow the author',
      links: [
        {
          label: 'GitHub',
          url: '',
        },
        {
          label: 'Website',
          url: '',
        },
        {
          label: 'Twitter',
          url: '',
        },
      ],
    },
  ],
}
