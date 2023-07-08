<template>
    <Layout :key="$route.fullPath">
        <transition name="fade" appear>
            <main>
                <section class="article-grid"> 
                    <article>
                        <h2>404</h2>
                        <h3>Page not found</h3>
                        <p>If you need help, don&rsquo;t hesitate to contact me on linkedin!</p>
                        <a class="calloutLink" href="/">Return Home</a>
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
        title: 'Doug Hahn',
        meta: [
          {
            name: 'description',
            content: '404 error page'
          }
        ]
      }
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
  h2, h3 {
    text-align:center;
  }
  .calloutLink {
    display:inline-block;
    width:100%;
    text-align:center;
    margin: 3rem auto;
  }

  </style>
  