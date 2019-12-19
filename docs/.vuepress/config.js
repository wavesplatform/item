module.exports = {
  title: 'Item Protocol Documentation',
  description: 'How to use Item Protocol',
  themeConfig: {
    docsRepo: 'wavesplatform/item',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    sidebar: [
      {
        title: 'Guides',
        collapsable: true,
        children: [
          '/guides/setup-local-item-protocol',
        ],
      },
    ],
  },
}