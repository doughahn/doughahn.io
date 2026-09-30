<template>
    <Layout :key="$route.fullPath">
        <transition name="fade" appear>
      <main>
        <div class="grid">
          <aside class="intro intro-sticky">
            <AboutAside />
          </aside>
          <section class="experience">
            <TaggedPosts />
          </section>
        </div>
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
        title: 'Projects',
        description: 'I\'m a skilled generalist, with projects spanning a variety of domains — including technical project management, strategy, to technical writing, and web development.',
        // same content as the homepage for now, so point search engines there
        path: '/',
        keywords: 'project management, collaboration, communication, content strategy, technical writing, technical editing, web development, app development, marketing, writing, editing, documentation, PMP',
      });
    },
  }
  </script>
  
  
  <page-query>
  query Post {
    allPost {
      edges {
        node {
          id
          title
          path
          summary
          date
          tags {
            id
          }
          years
          role
        }
      }
    }
    allTag {
      edges {
        node {
          id
        }
      }
    }
  }
  </page-query>  
  
  <style>
  .fade-enter-active {
    transition: opacity .5s;
  }
  
  .fade-enter {
    opacity: 0;
  }
  </style>
  