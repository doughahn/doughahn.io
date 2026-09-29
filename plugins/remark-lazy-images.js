// Adds loading="lazy" and decoding="async" to every markdown image so
// case-study images below the fold don't load until they're scrolled near.
const visit = require('unist-util-visit');

module.exports = () => tree => {
  visit(tree, 'image', node => {
    node.data = node.data || {};
    node.data.hProperties = {
      ...(node.data.hProperties || {}),
      loading: 'lazy',
      decoding: 'async',
    };
  });
};
