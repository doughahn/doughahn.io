<template>
  <div>
    <div class="header-area">
      <g-link to="/"><h1>Doug Hahn</h1></g-link>
      <a href="/projects/" class="nav-button">Projects</a>
    </div>
    <slot/>
    <footer>
      <p>&copy; {{ currentYear }} <a href="https://www.linkedin.com/in/douglas-hahn/">Doug Hahn</a></p>
    </footer>
  </div>
</template>


<script>
export default {
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
