import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import Chat from '@/views/Chat.vue'
import About from '@/views/About.vue'
import News from '@/views/News.vue'
import Search from '@/views/Search.vue'

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
      path: '/Novedades',
      name: 'News',
      component: News
    },
    {
      path: '/Buscar',
      name: 'Search',
      component: Search
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/Chat/:userId',
      name: 'ChatView',
      component: Chat
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
