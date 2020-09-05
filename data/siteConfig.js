module.exports = {
  siteTitle: "K-Sato's Blog",
  siteSubTitle: 'Always eager to learn new things',
  siteDescription: "This is K-Sato's Blog",
  authorName: 'K-Sato',
  twitterUsername: '_k-sato',
  authorAvatar: 'avatar.png', // file in content/images
  defaultLang: 'en', // show flag if lang is not default. Leave empty to enable flags in post lists
  authorDescription: `I am a web-developer based somewhere on earth. I primarily code in Ruby, TypeScript and JavaScript at work. RoR and React are my go-to Frameworks. Sometimes I play with Go language.`,
  siteUrl: 'https://k-sato-blog.netlify.com',
  disqusSiteUrl: 'https://k-sato-blog.netlify.com',
  pathPrefix: '/k-sato', // Note: it must *not* have a trailing slash.
  siteCover: 'background.jpeg', // file in content/images
  googleAnalyticsId: 'UA-158903478-1',
  background_color: '#ffffff',
  theme_color: '#222222',
  display: 'standalone',
  icon: 'content/images/avatar.png',
  postsPerPage: 6,
  disqusShortname: 'k-sato-blog-1',
  headerTitle: "K-Sato' Blog",
  headerLinksIcon: 'avatar.png', //  (leave empty to disable: '')
  postsBaseUrl:
    'https://github.com/K-Sato1995/gatsbyBlog/edit/master/content/posts',
  headerLinks: [
    {
      label: 'About',
      url: '/about',
    },
    {
      label: 'Experience',
      url: '/experience',
    },
  ],
  websiteHost: {
    name: 'Netlify',
    url: 'https://www.netlify.com/',
  },
}
