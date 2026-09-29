// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Figure from '~/components/Figure.vue'
import '~/styles/main.scss'
import 'prismjs/themes/prism.css'  

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('Figure', Figure)
  // add external css — Google Fonts (Source Sans 3, Inconsolata); Doves Headline is self-hosted in src/font
  head.link.push({
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com'
  })
  head.link.push({
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossorigin: true
  })
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap'
  })

  head.meta.push({
    key: 'og:image',
    property: 'og:image',
    name: 'image',
    content: 'https://doughahn.io/og-image.jpg'
  })
}
