<template>
  <Layout :key="$route.fullPath" page-has-title>
    <main>
      <section class="article-grid"> 
        <article>
          <p class="breadcrumbs">
            <g-link to="/">Home</g-link> → 
            <g-link to="/projects/">Projects</g-link> →
            <a :href="`/projects/#${breadcrumb.id}`">{{ breadcrumb.label }}</a>
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
          <TaggedPosts />
      </section>
    </div>
    </main>
  </Layout>
</template>

<script>
import pageMeta from '@/utils/meta';
import sections, { stageId } from '@/data/workSections';
import TaggedPosts from '@/components/TaggedPosts.vue';
import AboutAside from '@/components/AboutAside.vue';

export default {
  name: 'WorkExperience',
  components: {
    TaggedPosts,
    AboutAside
  },
  computed: {
    // the work-list group this post sits in: its LLNL or volunteer section, or,
    // for consulting, its stage (archived posts go to the consultant heading)
    breadcrumb() {
      const post = this.$page.post;
      const tag = post.tags.length > 0 ? post.tags[0].id : '';
      if (tag === sections.employer.tag || tag === sections.volunteer.tag) {
        return { id: this.formatTagId(tag), label: tag };
      }
      const { consultant } = sections;
      const listed = !post.archived && consultant.stages.some(stage => stage.key === post.stage);
      return {
        id: listed ? stageId(post.stage) : this.formatTagId(consultant.tag),
        label: consultant.title,
      };
    },
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
      stage
      archived
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
          role
          stage
          archived
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
