import DefaultLayout from '~/layouts/Default.vue'
import Figure from '~/components/Figure.vue'
import '~/styles/main.scss'
import 'prismjs/themes/prism.css'  // choose the theme that you like

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('Figure', Figure)

  if (process.isClient) {
    // Add the script on the client-side via Vue's mounted lifecycle hook
    Vue.mixin({
      mounted() {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cloud.typography.com/7216232/7655832/css/fonts.css'
        link.media = 'print'
        link.onload = function() {
          this.media = 'all'
        }
        document.head.appendChild(link)
      },
    })
  }
}
