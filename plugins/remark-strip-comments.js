// Removes HTML comments (<!-- TODO -->, <!-- CHECK -->, <!-- NOTE -->, …) from
// rendered pages. They stay in the Markdown as working notes, but remark would
// otherwise pass them through into the public page source.
const visit = require('unist-util-visit');

const COMMENT = /<!--[\s\S]*?-->/g;

module.exports = () => tree => {
  visit(tree, 'html', (node, index, parent) => {
    const value = node.value.replace(COMMENT, '');
    if (value.trim()) {
      node.value = value;
      return;
    }
    parent.children.splice(index, 1);
    return index; // revisit this position, which now holds the next sibling
  });
};
