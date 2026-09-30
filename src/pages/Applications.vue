<template>
    <Layout :key="$route.fullPath" page-has-title>
        <transition name="fade" appear>
          <main>
      <section class="article-grid"> 
        <article>
          <h1 class="page-title">Applications</h1>
          <p class="subtitle">Interested in hiring me?</p> 
          <p>Find me on <a href="https://www.linkedin.com/in/douglas-hahn/">LinkedIn</a>!</p>
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
      return pageMeta({
        title: 'Applications',
        description: 'I\'m a skilled generalist, with projects spanning a variety of domains — including technical project management, strategy, to technical writing, and web development.',
        path: '/applications/',
        keywords: 'project management, collaboration, communication, content strategy, technical writing, technical editing, web development, app development, marketing, writing, editing, documentation, PMP',
      });
    },
  }
  </script>
  
  
  <page-query>

    </page-query>
  
  <style>
  .fade-enter-active {
    transition: opacity .5s;
  }
  
  .fade-enter {
    opacity: 0;
  }
  </style>
  