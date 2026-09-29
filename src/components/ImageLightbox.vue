<template>
  <transition name="lightbox-fade">
    <div
      v-if="open"
      class="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      :aria-label="alt ? `Enlarged image: ${alt}` : 'Enlarged image'"
      @click="close"
    >
      <button ref="closeButton" class="lightbox-close" type="button" aria-label="Close image" @click="close">
        &times;
      </button>
      <img class="lightbox-img" :src="src" :alt="alt" @click.stop />
      <div v-if="caption" class="lightbox-caption">{{ caption }}</div>
    </div>
  </transition>
</template>

<script>
// Delegated lightbox: any <figure><img> in the page (including markdown
// rendered via v-html) becomes clickable and opens full-size in a modal.
// Images are also made focusable so Enter/Space opens them from the keyboard.
const ZOOMABLE = 'figure img';

function zoomableImage(el) {
  if (!el || !el.closest) return null;
  const img = el.closest(ZOOMABLE);
  if (!img || img.closest('a')) return null; // leave linked images alone
  return img;
}

export default {
  name: 'ImageLightbox',
  data() {
    return { open: false, src: '', alt: '', caption: '' };
  },
  methods: {
    show(img) {
      this.src = img.currentSrc || img.src;
      this.alt = img.alt || '';
      const cap = img.closest('figure').querySelector('figcaption');
      this.caption = cap ? cap.textContent.trim() : '';
      this.returnFocus = document.activeElement;
      this.open = true;
      document.body.style.overflow = 'hidden';
      this.$nextTick(() => this.$refs.closeButton && this.$refs.closeButton.focus());
    },
    close() {
      if (!this.open) return;
      this.open = false;
      document.body.style.overflow = '';
      if (this.returnFocus && this.returnFocus.focus) this.returnFocus.focus();
      this.returnFocus = null;
    },
    onDocClick(e) {
      const img = zoomableImage(e.target);
      if (!img) return;
      e.preventDefault();
      this.show(img);
    },
    onKeydown(e) {
      if (this.open) {
        if (e.key === 'Escape') this.close();
        // the close button is the only control, so keep focus on it
        if (e.key === 'Tab') {
          e.preventDefault();
          this.$refs.closeButton.focus();
        }
        return;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        const img = zoomableImage(e.target);
        if (!img) return;
        e.preventDefault();
        this.show(img);
      }
    },
    makeImagesFocusable() {
      document.querySelectorAll(ZOOMABLE).forEach(img => {
        if (img.hasAttribute('tabindex') || img.closest('a')) return;
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-haspopup', 'dialog');
      });
    },
  },
  mounted() {
    document.addEventListener('click', this.onDocClick);
    document.addEventListener('keydown', this.onKeydown);
    this.makeImagesFocusable();
    // markdown content renders after mount and changes on navigation
    this.observer = new MutationObserver(() => this.makeImagesFocusable());
    this.observer.observe(document.body, { childList: true, subtree: true });
  },
  beforeDestroy() {
    document.removeEventListener('click', this.onDocClick);
    document.removeEventListener('keydown', this.onKeydown);
    if (this.observer) this.observer.disconnect();
    document.body.style.overflow = '';
  },
};
</script>

<style scoped>
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: rgba(0, 0, 0, 0.85);
  cursor: zoom-out;
  padding: 4vmin;
}
.lightbox-img {
  max-width: 95vw;
  max-height: 88vh;
  width: auto;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  cursor: default;
}
.lightbox-caption {
  color: #fff;
  background: transparent;
  font-style: italic;
  text-align: center;
  max-width: 95vw;
  margin: 0;
}
.lightbox-close {
  position: fixed;
  top: 0.75rem;
  right: 1.25rem;
  font-size: 2.75rem;
  line-height: 1;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.75rem;
}
.lightbox-close:hover {
  opacity: 0.7;
}
.lightbox-close:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 200ms ease;
}
.lightbox-fade-enter,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
