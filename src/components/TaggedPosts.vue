<template>
  <div id="portfolioNav">
    <h2>My Work</h2>
    <div v-for="tag in orderedTags" :key="tag.id" class="experience-domain">
      <h4 :id="formatTagId(tag.id)">{{ tag.id }}</h4>
      <dl>
        <span v-for="post in getPostsByTag(tag.id)" :key="post.node.id" class="experience-item">
          <g-link :to="post.node.path">
            <dt>{{ post.node.years }}</dt>
            <dd>{{ post.node.title }}</dd>
          </g-link>
        </span>
      </dl>
    </div>
    <hr>
    <div class="experience-domain">
      <h4>Education &amp; Certifications</h4>
      <dl>
        <span class="experience-item">
          <a href="https://www.credly.com/badges/6b56b009-4868-4c38-97e0-53b29df69449/public_url">
            <dt>2021</dt> 
            <dd>Project Management Professional (PMP) #3130172</dd>
          </a>
        </span>
        <span class="experience-item">
          <a href="https://www.sarahlawrence.edu/writing-mfa/">
            <dt>2006</dt> 
            <dd>Master of Fine Arts, Creative Writing from Sarah Lawrence</dd>
          </a>
        </span>
        <span class="experience-item">
          <a href="https://www.luc.edu/">
            <dt>2002</dt> 
            <dd>Bachelor of Arts, English from Loyola University</dd>
          </a>
        </span>
      </dl>
    </div>
  </div>
</template>

<script>
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
      // Only return tags that are in the tagOrder array, in the specified order
      return this.tagOrder
        .map(orderedTagId => {
          const foundTag = this.$page.allTag.edges
            .find(edge => edge.node.id === orderedTagId);
          return foundTag ? foundTag.node : null;
        })
        .filter(tag => tag !== null);
    }
  },
  methods: {
    getPostsByTag(tag) {
      return this.$page.allPost.edges
        .filter(edge => edge.node.tags.find(t => t.id === tag))
        .sort((a, b) => {
          // Sort by years descending (newest first)
          const yearA = parseInt(a.node.years);
          const yearB = parseInt(b.node.years);
          return yearB - yearA;
        });
    },
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