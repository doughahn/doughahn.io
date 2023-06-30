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
    Post: "/projects/:title",
  },
  transformers: {
    remark: {
      autolinkClassName: 'icon icon-link heading-anchor',
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
      ],
    },
  },
};
