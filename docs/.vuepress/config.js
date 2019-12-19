module.exports = {
  title: 'Docs',
  description: 'Item Protocol Documentation',
  themeConfig: {
    logo: '/assets/logo.svg',
    docsRepo: 'wavesplatform/item',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'GitHub', link: 'https://github.com/wavesplatform/item' },
    ],
    sidebar: [
      {
        title: 'Guides',
        collapsable: true,
        children: [
          '/guides/setup-local-item-protocol',
        ],
      },
      {
        title: 'Protocol Concept',
        collapsable: true,
        children: [],
      },
      {
        title: 'Tools/Libraries',
        collapsable: true,
        children: [],
      },
      {
        title: 'API Reference',
        collapsable: true,
        children: [],
      },
    ],
    searchPlaceholder: 'Search...',
    lastUpdated: 'Last Updated',
  },
}