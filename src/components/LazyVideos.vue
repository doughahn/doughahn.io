<template>
  <span hidden />
</template>

<script>
// Plays <video data-autoplay> clips (see plugins/remark-lazy-videos.js) only
// while they're on screen, so they download when scrolled near, not on load.
// With "reduce motion" on, they never autoplay; controls let people play them.
const SELECTOR = 'video[data-autoplay]';

export default {
  name: 'LazyVideos',
  methods: {
    setup() {
      document.querySelectorAll(SELECTOR).forEach(video => {
        if (video.dataset.lazyReady) return;
        video.dataset.lazyReady = 'true';
        if (this.reducedMotion.matches) {
          video.pause();
          video.controls = true;
          video.preload = 'metadata';
        } else if (this.observer) {
          this.observer.observe(video);
        } else {
          this.play(video);
        }
      });
    },
    play(video) {
      const attempt = video.play();
      if (attempt && attempt.catch) attempt.catch(() => { video.controls = true; });
    },
    onIntersect(entries) {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) this.play(target);
        else target.pause();
      });
    },
    onMotionChange() {
      // re-apply when the OS setting changes while the page is open
      document.querySelectorAll(SELECTOR).forEach(video => {
        delete video.dataset.lazyReady;
        if (this.observer) this.observer.unobserve(video);
        video.controls = false;
      });
      this.setup();
    },
  },
  mounted() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if ('IntersectionObserver' in window) {
      // start a little before the video enters the viewport
      this.observer = new IntersectionObserver(this.onIntersect, { rootMargin: '200px 0px' });
    }
    this.setup();
    // case-study content renders after mount and changes on navigation
    this.mutations = new MutationObserver(() => this.setup());
    this.mutations.observe(document.body, { childList: true, subtree: true });
    this.reducedMotion.addEventListener('change', this.onMotionChange);
  },
  beforeDestroy() {
    if (this.observer) this.observer.disconnect();
    if (this.mutations) this.mutations.disconnect();
    this.reducedMotion.removeEventListener('change', this.onMotionChange);
  },
};
</script>
