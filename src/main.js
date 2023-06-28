// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Figure from '~/components/Figure.vue'
import '~/styles/main.scss'
import 'prismjs/themes/prism.css'  // choose the theme that you like

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('Figure', Figure)
  // add external css
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cloud.typography.com/7216232/7655832/css/fonts.css'
  })

  head.meta.push({
    key: 'og:image',
    property: 'og:image',
    name: 'image',
    content: 'https://doughahn.io/og-image.jpg'
  })
}
