<template>
  <Layout :key="$route.fullPath" page-has-title>
    <main>
      <section class="article-grid"> 
        <article>
          <p class="breadcrumbs">
            <g-link to="/">Home</g-link> → 
            <g-link to="/projects/">Projects</g-link> →
            <a :href="`/projects/#${formatTagId($page.post.tags.length > 0 ? $page.post.tags[0].id : '')}`">{{ $page.post.tags.length > 0 ? $page.post.tags[0].id : '' }}</a>
          </p>
          <h1 class="page-title">{{ $page.post.title }}</h1>
          <div class="projectInfo">
            <div class="skills">
              <h2 class="project-label">Responsibilities:</h2>
              <ul v-if="$page.post.projSkills && $page.post.projSkills.length">
                <li v-for="(skill, index) in $page.post.projSkills" :key="index">{{ skill }}</li>
              </ul>
            </div>
            <div class="outcomes">
              <h2 class="project-label">Outcomes:</h2>
              <p v-if="$page.post.projOutcomes">{{ $page.post.projOutcomes }}</p>
            </div>
          </div>
          <h2 class="visually-hidden">Case study</h2>
          <transition name="fade" appear>
            <div v-html="$page.post.content"></div>
          </transition>
      </article>
      </section>
    <div class="grid project-page-experience">
      <aside class="intro-sticky">
        <AboutAside />
      </aside>
      <section class="experience">
          <TaggedPosts :tagOrder="['Lawrence Livermore National Lab', 'Technical Project Manager', 'Business Strategist', 'Content Strategist', 'Technical Writer', 'Developer', 'Marketer', 'Writer/Editor', 'Volunteer']"/>
      </section>
    </div>
    </main>
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
    const post = this.$page.post;
    return pageMeta({
      title: post.title,
      description: post.projOutcomes || post.summary,
      path: post.path,
      image: post.projImg || undefined,
      type: 'article',
      keywords: (post.projSkills || []).join(', '),
    });
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
      path
      summary
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
