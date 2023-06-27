<template>
  <Layout :key="$route.fullPath">
    <main>
      <section class="article-grid"> 
        <article>
          <p class="breadcrumbs">
            <g-link to="/">Home</g-link> → 
            <g-link to="/projects/">Projects</g-link> →
            <a :href="`/projects/#${formatTagId($page.post.tags.length > 0 ? $page.post.tags[0].id : '')}`">{{ $page.post.tags.length > 0 ? $page.post.tags[0].id : '' }}</a>
          </p>
          <h2>{{ $page.post.title }}</h2>
          <div class="projectInfo">
            <div class="skills">
              <h4>Responsibilities:</h4>
              <ul v-if="$page.post.projSkills && $page.post.projSkills.length">
                <li v-for="(skill, index) in $page.post.projSkills" :key="index">{{ skill }}</li>
              </ul>
            </div>
            <div class="outcomes">
              <h4>Outcomes:</h4>
              <p v-if="$page.post.projOutcomes">{{ $page.post.projOutcomes }}</p>
            </div>
          </div>

          <transition name="fade" appear>
            <div v-html="$page.post.content"></div>
          </transition>
      </article>
      </section>
    </main>
    <div class="grid project-page-experience">
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
    formatTagId(id) {
      return id.replace(/\s+/g, '-').toLowerCase();
    },
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
    allPost {
      edges {
        node {
          id
          title
          path
          summary
          projOutcomes
          projSkills
          projImg
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
