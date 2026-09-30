<template>
    <Layout :key="$route.fullPath" page-has-title>
        <transition name="fade" appear>
            <main>
                <section class="article-grid"> 
                    <article class="utility">
                        <h1 class="page-title">404</h1>
                        <p class="subtitle">Page not found</p>
                        <p>If you need help, don&rsquo;t hesitate to contact me on <a href="https://www.linkedin.com/in/douglas-hahn/">LinkedIn</a>!</p>
                        <a class="calloutLink" href="/">Return Home</a>
                    </article>
                </section>
            </main>
    </transition>
    </Layout>
  </template>
  
  <script>
  import pageMeta from '@/utils/meta';
  import TaggedPosts from '@/components/TaggedPosts.vue';
  import AboutAside from '@/components/AboutAside.vue';
  
  export default {
    name: 'WorkExperience',
    components: {
      TaggedPosts,
      AboutAside
    },
    metaInfo() {
      const meta = pageMeta({
        title: 'Page not found',
        description: 'This page doesn’t exist. Return to Doug Hahn’s homepage to see his work.',
        path: this.$route.path,
      });
      meta.meta.push({ key: 'robots', name: 'robots', content: 'noindex' });
      return meta;
    }
  }
  </script>
  
  <style>
  .fade-enter-active {
    transition: opacity .5s;
  }
  
  .fade-enter {
    opacity: 0;
  }
  .utility .page-title,
  .utility .subtitle {
    text-align:center;
  }
  .utility .calloutLink {
    display:inline-block;
    width:100%;
    text-align:center;
    margin: 3rem auto;
  }

  </style>
  