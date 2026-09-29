<template>
  <div>
    <div class="header-area">
      <g-link to="/" class="site-title-link">
        <component :is="pageHasTitle ? 'p' : 'h1'" class="site-title">Doug Hahn</component>
      </g-link>
      <a href="/projects/" class="nav-button">Projects</a>
    </div>
    <slot/>
    <footer>
      <p>&copy; {{ currentYear }} <a href="https://www.linkedin.com/in/douglas-hahn/">Doug Hahn</a></p>
    </footer>
    <ImageLightbox />
    <LazyVideos />
  </div>
</template>


<script>
import ImageLightbox from '@/components/ImageLightbox.vue'
import LazyVideos from '@/components/LazyVideos.vue'

export default {
  components: {
    ImageLightbox,
    LazyVideos,
  },
  props: {
    // pages with their own <h1> (case studies, 404) demote the site name
    pageHasTitle: { type: Boolean, default: false },
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
}
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
