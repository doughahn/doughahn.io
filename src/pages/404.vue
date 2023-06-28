<template>
    <Layout>
        <main>
            <section class="article-grid"> 
                <article>
                    <h2>Weigh Enough!</h2>
                    <transition name="fade" appear>
                        <div>   
                            <h3>Sorry, that's a 404.</h3>
                            <p>The page you're looking for doesn't exist</p>
                            <p><strong><a href="/">return home</a></strong></p>
                            
                            <figure>
                                <img src="/weigh-nuff.webp" alt="Weigh enough!" />
                            </figure>
                        </div>
                    </transition>
                </article>
            </section>
        </main>
    </Layout>
  </template>
  
  <script>
  import { MetaInfo } from 'vue-meta';
  import TaggedPosts from '@/components/TaggedPosts.vue';
  import AboutAside from '@/components/AboutAside.vue';
  
  export default {
    metaInfo() {
      return {
        title: '404',
        meta: [
          {
            name: 'description',
            content: 'Page not found',
          }
        ]
      }
    }
    }
  </script>
  
  <page-query>
    query Post ($path: String!) {
      post (path: $path) {
        title
        content
        date (format: "D MMMM, YYYY")
        tags {
          id
          path
          title
        }
        projOutcomes
        projSkills
        projImg
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
  