import Vue from 'vue'
import Router from 'vue-router'
import Description from './components/Description.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/description', 
      name: "description",
      component: Description 
    }
  ]
})