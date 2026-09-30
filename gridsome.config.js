module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  siteName: "Doug Hahn",
  siteUrl: "https://doughahn.io",
  titleTemplate: '%s',
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Post",
        path: "./projects/**/*.md",
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          },
        },
      },
    },
  ],
  templates: {
    Tag: '/tag/:id',
    // URLs come from each post's frontmatter `slug`, so retitling never breaks a link
    Post: "/projects/:slug",
  },
  transformers: {
    remark: {
      // visible "#" after each heading; labelled by plugins/remark-heading-anchor-labels
      autolinkHeadings: {
        behavior: 'append',
        content: { type: 'text', value: '#' },
        linkProperties: { className: ['heading-anchor'] },
      },
      externalLinksTarget: '_blank',
      externalLinksRel: ['noopener', ],
      anchorClassName: 'icon icon-link',
      plugins: [
        [
          "gridsome-plugin-remark-prismjs-all",
          {
            showLineNumbers: true, // Default false
          },
        ],
        [
          "gridsome-remark-figure-caption",
          {
            // All the options here are optional
            figureClassName: "md-figure-block",
            imageClassName: "md-figure-image",
            captionClassName: "md-figure-caption",
          },
        ],
        require("./plugins/remark-strip-comments"),
        require("./plugins/remark-lazy-images"),
        require("./plugins/remark-lazy-videos"),
        require("./plugins/remark-heading-anchor-labels"),
      ],
    },
  },
};
