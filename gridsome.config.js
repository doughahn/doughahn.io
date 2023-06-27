// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  module: {
    rules: [
      // ... other rules omitted

      // this will apply to both plain `.scss` files
      // AND `<style lang="scss">` blocks in `.vue` files
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
  // plugin omitted
}

module.exports = {
	siteName: "Doug Hahn",
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

