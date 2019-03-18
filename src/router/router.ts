import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "register" */ '@/views/Register.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () =>
        import(/* webpackChunkName: "settings" */ '@/views/Settings.vue')
    },
    {
      name: 'article',
      path: '/articles/:slug',
      component: () =>
        import(/* webpackChunkName: "article" */ '@/views/Article.vue'),
      props: true
    },
    {
      path: '/@:username',
      component: () => import('@/views/Profile.vue'),
      children: [
        {
          path: '',
          name: 'profile',
          component: () => import('@/views/ProfileArticles.vue')
        },
        {
          path: 'favorites',
          name: 'profile-favorites',
          component: () => import('@/views/ProfileFavorited.vue')
        }
      ]
    },
    {
      name: 'article-create',
      path: '/editor',
      props: true,
      component: () => import('@/views/ArticleCreate.vue')
    },
    {
      name: 'article-edit',
      path: '/editor/:articleId',
      props: true,
      component: () => import('@/views/ArticleEdit.vue')
    }
  ]
})
