import Vue from 'vue'
import VueRouter from 'vue-router'
import Description from './components/Description.vue'
import Articles from './components/Articles.vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/custom.scss'
import VueCarousel from 'vue-carousel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faSmileBeam} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { dom } from '@fortawesome/fontawesome-svg-core'

Vue.use(VueCarousel);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
library.add(faTruck)
library.add(faStopwatch)
library.add(faRetweet)
library.add(faSmileBeam)
dom.watch()

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false


const routes = [
  { path: '/', name:'articles', component: Articles },
  { path: '/article/:articleId', name:'article', component: Description },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')


