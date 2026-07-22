<template>
  <transition name="lightbox-fade">
    <div
      v-if="open"
      class="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      @click="close"
    >
      <button class="lightbox-close" type="button" aria-label="Close image" @click="close">
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
export default {
  name: 'ImageLightbox',
  data() {
    return { open: false, src: '', alt: '', caption: '' };
  },
  methods: {
    onDocClick(e) {
      const target = e.target;
      if (!target || !target.closest) return;
      const img = target.closest('figure img');
      if (!img) return;
      if (img.closest('a')) return; // leave linked images alone
      e.preventDefault();
      this.src = img.currentSrc || img.src;
      this.alt = img.alt || '';
      const cap = img.closest('figure').querySelector('figcaption');
      this.caption = cap ? cap.textContent.trim() : '';
      this.open = true;
      document.body.style.overflow = 'hidden';
    },
    onKeydown(e) {
      if (e.key === 'Escape') this.close();
    },
    close() {
      this.open = false;
      document.body.style.overflow = '';
    },
  },
  mounted() {
    document.addEventListener('click', this.onDocClick);
    document.addEventListener('keydown', this.onKeydown);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.onDocClick);
    document.removeEventListener('keydown', this.onKeydown);
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
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 200ms ease;
}
.lightbox-fade-enter,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
