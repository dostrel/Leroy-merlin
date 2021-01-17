import Vue from 'vue'
import VueRouter from 'vue-router'
import Description from './components/Description.vue'
import Articles from './components/Articles.vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/custom.scss'
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

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


