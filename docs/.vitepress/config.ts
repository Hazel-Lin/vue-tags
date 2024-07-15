// https://vitepress.dev/reference/site-config
export default ({
  title: 'Vue Tags',
  description: 'The tag component of Vue.',
  themeConfig: {
    logo: '/icon.jpg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '配置', link: '/config/' },
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速上手', link: '/get-started/' },
        ],
      },
      {
        text: '配置',
        items: [
          { text: '配置', link: '/config/' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Hazel-Lin/vue-tags' },
    ],
  },
})
