<template>
  <Layout :key="$route.fullPath">
      <transition name="fade" appear>
    <main>
      <div class="grid">
        <aside class="intro intro-sticky">
          <AboutAside />
        </aside>
        <section class="experience">
          <TaggedPosts :tagOrder="['Lawrence Livermore National Lab', 'Technical Project Manager', 'Business Strategist', 'Content Strategist', 'Technical Writer', 'Developer', 'Marketer', 'Writer/Editor', 'Volunteer']"/>
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
      title: 'Doug Hahn',
      description: 'I am a PMP-certified project person with an MFA in poetry; I have skills in web & app development, content strategy, documentation, writing, marketing, and communication. Accountability, compassion, and hands-on experience form the cornerstones of my approach.',
      path: '/',
      keywords: 'project management, collaboration, communication, content strategy, technical writing, technical editing, web development, app development, marketing, writing, editing, documentation, PMP',
    });
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
