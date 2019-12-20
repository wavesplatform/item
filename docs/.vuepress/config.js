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
        collapsable: false,
        children: [
          '/guides/setup-local-item-protocol',
          '/guides/deploy-custom-item-store-instance',
        ],
      },
      {
        title: 'Protocol Concept',
        collapsable: false,
        children: [
          '/protocol-concept/core',
          '/protocol-concept/store',
        ],
      },
      {
        title: 'Tools/Libraries',
        collapsable: false,
        children: [
          'tools-libs/overview',
        ],
      },
      {
        title: 'API Reference',
        collapsable: false,
        children: [],
      },
    ],
    searchPlaceholder: 'Search...',
    lastUpdated: 'Last Updated',
  },
}