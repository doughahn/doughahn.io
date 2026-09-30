// Gives each heading's "#" anchor (added by remark-autolink-headings, see
// gridsome.config.js) an accessible name that says which section it links to.
const visit = require('unist-util-visit');

const textOf = node =>
  node.type === 'text' || node.type === 'inlineCode'
    ? node.value
    : node.type === 'html'
    ? node.value.replace(/<[^>]+>/g, '')
    : (node.children || []).map(textOf).join('');

module.exports = () => tree => {
  visit(tree, 'heading', heading => {
    const anchor = heading.children[heading.children.length - 1];
    if (!anchor || anchor.type !== 'link' || !anchor.url.startsWith('#')) return;
    const label = heading.children.slice(0, -1).map(textOf).join('').trim();
    anchor.data.hProperties['aria-label'] = `Link to section: ${label}`;
  });
};
