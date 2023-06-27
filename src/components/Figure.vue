<template>
    <figure>
      <img :src="src" :alt="alt" />
      <figcaption v-if="caption">{{ caption }}</figcaption>
    </figure>
  </template>
  
  <script>
  export default {
    props: {
      src: { type: String, required: true },
      alt: { type: String, default: '' },
      caption: { type: String, default: '' },
    },
  };
  </script>
  