<template>
    <Layout :key="$route.fullPath">
        <transition name="fade" appear>
      <main>
        <div class="grid">
            <aside>
              <h2>About Me</h2>
            <h3>Collaborator, Owner, Skilled Generalist</h3>
            <p class="leadin"><b>I&rsquo;m a certified Project Management Professional</b> with an MFA in poetry. I have skills in web &amp; app development, content design, documentation, writing, marketing, and communication. Accountability, compassion, and hands-on experience form the cornerstones of my approach.</p>
            <p class="leadin"><b>My three pillars are:</b></p>
        <ul class="leadin-list">
            <li>Create meaningful change within he organization</li>
            <li>Foster positive change outside the organization</li>
            <li>Learn from people smarter than me</li>
        </ul>
            <a class="calloutLink" href="https://www.linkedin.com/in/douglas-hahn/">LinkedIn</a>
            </aside>
            <nav class="experience">
              <TaggedPosts :tagOrder="['Technical PM', 'Business Strategist', 'Content Strategist', 'Technical Writer', 'Developer', 'Marketer', 'Writer/Editor', 'Volunteer']"/>
            </nav>
        </div>
      </main>
    </transition>
    </Layout>
  </template>
  
  <script>
  import TaggedPosts from '@/components/TaggedPosts.vue';
  
  export default {
    name: 'WorkExperience',
    components: {
      TaggedPosts
    },
    methods: {
      isSmallScreen() {
        return window.innerWidth < 640; // med bp
      }
    }
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
  