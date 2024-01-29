import { defineNuxtPlugin } from '#app'
import VueObserveVisibility from 'vue-observe-visibility'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueObserveVisibility)
})
