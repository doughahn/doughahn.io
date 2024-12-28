<template>
  <Layout :key="$route.fullPath">
    <main>
          <transition name="fade" appear>
            <div v-html="$page.applicant.content"></div>
          </transition>
    </main>
  </Layout>
</template>

<script>
import { MetaInfo } from 'vue-meta';
import AboutAside from '@/components/AboutAside.vue';
import Layout from '~/layouts/Custom.vue'


export default {
  components: {
      Layout
    },
  metaInfo() {
    return {
      title: this.$page.applicant.title,
      meta: [
        {
          name: 'description',
          content: this.$page.applicant.summary,
        }
      ]
    }
  },
}
</script>

<page-query>

</page-query>
