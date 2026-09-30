<template>
  <div id="portfolioNav">
    <h2 class="section-heading">My Work</h2>

    <!-- one heading per job at the employer, newest first, so growth reads top-down -->
    <section class="experience-section" :id="formatTagId(sections.employer.tag)">
      <div v-for="role in employerRoles" :key="role.slug" class="experience-job">
        <h3 class="experience-role">
          <g-link v-if="role.post" :to="role.post.path">
            <abbr :title="sections.employer.title">{{ sections.employer.shortTitle }}</abbr>: {{ role.post.title }}
          </g-link>
          <span v-if="role.post" class="experience-role-years">{{ formatYears(role.post.years) }}</span>
        </h3>
        <p v-if="role.blurb" class="experience-blurb">{{ role.blurb }}</p>
        <ul v-if="role.projects.length" class="experience-list">
          <li v-for="post in role.projects" :key="post.id" class="experience-item">
            <g-link :to="post.path">
              <span class="experience-year">{{ formatYears(post.years) }}</span>
              <span class="experience-title">{{ post.title }}</span>
            </g-link>
          </li>
        </ul>
      </div>
    </section>

    <section class="experience-section">
      <h3>{{ sections.consultant.title }}</h3>
      <div v-for="group in consultantGroups" :key="group.tag" class="experience-domain">
        <h4 :id="formatTagId(group.tag)">{{ group.tag }}</h4>
        <ul class="experience-list">
          <li v-for="post in group.posts" :key="post.id" class="experience-item">
            <g-link :to="post.path">
              <span class="experience-year">{{ formatYears(post.years) }}</span>
              <span class="experience-title">{{ post.title }}</span>
            </g-link>
          </li>
        </ul>
      </div>
    </section>

    <section class="experience-section">
      <h3 :id="formatTagId(sections.volunteer.tag)">{{ sections.volunteer.title }}</h3>
      <div class="experience-domain">
        <ul class="experience-list">
          <li v-for="post in volunteerPosts" :key="post.id" class="experience-item">
            <g-link :to="post.path">
              <span class="experience-year">{{ formatYears(post.years) }}</span>
              <span class="experience-title">{{ post.title }}</span>
            </g-link>
          </li>
        </ul>
      </div>
    </section>

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
import sections from '@/data/workSections';
import { formatYears, compareYearsDesc } from '@/utils/years';

const byYearsDesc = (a, b) => compareYearsDesc(a.years, b.years);

export default {
  name: 'TaggedPosts',
  data() {
    return { sections };
  },
  computed: {
    posts() {
      return this.$page.allPost.edges.map(edge => edge.node);
    },
    // each post is filed under its first tag only
    primaryTag() {
      return post => (post.tags[0] ? post.tags[0].id : '');
    },
    employerRoles() {
      const { tag, roles } = sections.employer;
      const employerPosts = this.posts.filter(post => this.primaryTag(post) === tag);
      const slugOf = post => post.path.replace(/\/$/, '').split('/').pop();
      const roleSlugs = roles.map(role => role.slug);
      const grouped = roles.map(role => ({
        ...role,
        post: employerPosts.find(post => slugOf(post) === role.slug),
        projects: employerPosts.filter(post => post.role === role.slug).sort(byYearsDesc),
      }));
      // anything at the employer without a known role still shows, under the first role
      const orphans = employerPosts.filter(post =>
        !roleSlugs.includes(slugOf(post)) && !roleSlugs.includes(post.role));
      if (grouped.length) grouped[0].projects.push(...orphans.sort(byYearsDesc));
      return grouped;
    },
    consultantGroups() {
      const excluded = [sections.employer.tag, sections.volunteer.tag];
      const consultantPosts = this.posts.filter(post => !excluded.includes(this.primaryTag(post)));
      const tags = [...new Set(consultantPosts.map(this.primaryTag))];
      const order = sections.consultant.skillOrder;
      const ordered = [
        ...order.filter(tag => tags.includes(tag)),
        ...tags.filter(tag => !order.includes(tag)),
      ];
      return ordered.map(tag => ({
        tag,
        posts: consultantPosts.filter(post => this.primaryTag(post) === tag).sort(byYearsDesc),
      }));
    },
    volunteerPosts() {
      return this.posts
        .filter(post => this.primaryTag(post) === sections.volunteer.tag)
        .sort(byYearsDesc);
    },
  },
  methods: {
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
        role
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