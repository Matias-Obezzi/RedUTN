import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import About from '@/views/About.vue'
import Search from '@/views/Search.vue'
import Explore from '@/views/Explore.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Informacion',
      name: 'About',
      component: About
    },
    {
      path: '/Explorar',
      name: 'Explore',
      component: Explore
    },
    {
      path: '/Buscar',
      name: 'Search',
      component: Search
    },
    {
      path: '/:userId',
      name: 'Profile',
      component: Profile
    },
  ],
  mode: "history"
});

export default router
