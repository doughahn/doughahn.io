// Turns markdown <video autoplay> into <video data-autoplay preload="none">
// so no video downloads with the page. LazyVideos.vue then plays each one
// when it scrolls into view (or never, for people who prefer reduced motion).
const visit = require('unist-util-visit');

const VIDEO_TAG = /<video\b[^>]*>/gi;

module.exports = () => tree => {
  visit(tree, 'html', node => {
    node.value = node.value.replace(VIDEO_TAG, tag => {
      if (!/\sautoplay\b/i.test(tag)) return tag;
      return tag
        .replace(/\sautoplay\b/i, ' data-autoplay')
        .replace(/\spreload="[^"]*"/i, '')
        .replace(/>$/, ' preload="none">');
    });
  });
};
