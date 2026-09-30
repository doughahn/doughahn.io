<template>
  <div id="portfolioNav">
    <h2 class="section-heading">My Work</h2>
    <div v-for="tag in orderedTags" :key="tag.id" class="experience-domain">
      <h3 :id="formatTagId(tag.id)">{{ tag.id }}</h3>
      <ul class="experience-list">
        <li v-for="post in getPostsByTag(tag.id)" :key="post.node.id" class="experience-item">
          <g-link :to="post.node.path">
            <span class="experience-year">{{ formatYears(post.node.years) }}</span>
            <span class="experience-title">{{ post.node.title }}</span>
          </g-link>
        </li>
      </ul>
    </div>
    <hr>
    <div class="experience-domain">
      <h3>Education &amp; Certifications</h3>
      <ul class="experience-list">
        <li class="experience-item">
          <a href="https://www.credly.com/badges/6b56b009-4868-4c38-97e0-53b29df69449/public_url">
            <span class="experience-year">2021</span>
            <span class="experience-title">Project Management Professional (PMP) #3130172</span>
          </a>
        </li>
        <li class="experience-item">
          <a href="https://www.sarahlawrence.edu/writing-mfa/">
            <span class="experience-year">2006</span>
            <span class="experience-title">Master of Fine Arts, Creative Writing from Sarah Lawrence</span>
          </a>
        </li>
        <li class="experience-item">
          <a href="https://www.luc.edu/">
            <span class="experience-year">2002</span>
            <span class="experience-title">Bachelor of Arts, English from Loyola University</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { formatYears, compareYearsDesc } from '@/utils/years';

export default {
  name: 'TaggedPosts',
  props: {
    tagOrder: {
      type: Array,
      required: true
    }
  },
  computed: {
    orderedTags() {
      // Tags in tagOrder come first, in that order; any unlisted tags follow
      // so a renamed or new tag never silently disappears from the list
      const tags = this.$page.allTag.edges.map(edge => edge.node);
      const listed = this.tagOrder
        .map(orderedTagId => tags.find(tag => tag.id === orderedTagId))
        .filter(Boolean);
      const unlisted = tags.filter(tag => !this.tagOrder.includes(tag.id));
      return [...listed, ...unlisted];
    }
  },
  methods: {
    getPostsByTag(tag) {
      return this.$page.allPost.edges
        .filter(edge => edge.node.tags.find(t => t.id === tag))
        .sort((a, b) => compareYearsDesc(a.node.years, b.node.years));
    },
    formatYears,
    formatTagId(id) {
      return id.replace(/\s+/g, '-').toLowerCase();
    },
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
        projOutcomes
        projSkills
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