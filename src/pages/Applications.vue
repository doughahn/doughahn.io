<template>
    <Layout :key="$route.fullPath">
        <transition name="fade" appear>
          <main>
      <section class="article-grid"> 
        <article>
          <h2>Applications</h2>
          <h3>Interested in hiring me?</h3> 
          <p>Find me on <a href="https://www.linkedin.com/in/douglas-hahn/">LinkedIn</a>!</p>
      </article>
      </section>
    </main>
    </transition>
    </Layout>
  </template>
  
  <script>
  import TaggedPosts from '@/components/TaggedPosts.vue';
  import AboutAside from '@/components/AboutAside.vue';

  export default {
    name: 'WorkExperience',
    components: {
      TaggedPosts,
      AboutAside
    },
    metaInfo() {
    return {
      title: 'Doug Hahn\'s Applications',
      meta: [
        {
          name: 'description',
          content: 'I\'m a skilled generalist, with projects spanning a variety of domains — including technical project management, strategy, to technical writing, and web development.'
        },
        {
          name: 'keywords',
          content: 'project management, collaboration, communication, content strategy, technical writing, technical editing, web development, app development, marketing, writing, editing, documentation, PMP',
        }
      ]
    }
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
  