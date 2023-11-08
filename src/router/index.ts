import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useStore} from "vuex";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { authRequired: false },
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      meta: { authRequired: false },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { authRequired: false },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LogInView.vue')
    },
    {
      path: '/book',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BookView.vue'),
      children: [
        {
          path: 'create',
          name: 'createBook',
          meta: { authRequired: false },
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/CreateBookView.vue')
        },
        {
          path: ':id/edit',
          name: 'editBook',
          meta: { authRequired: true },
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/EditBookView.vue')
        },
        {
          path: '',
          name: 'book',
          meta: { authRequired: false },
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/BookListView.vue')
        },
      ]
    },
    {
      path: '/vinyl',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/VinylView.vue'),
      children: [
        {
          path: ':id/edit',
          name: 'editVinyl',
          meta: { authRequired: true },
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/EditVinylView.vue')
        },
        {
          path: 'create',
          name: 'createVinyl',
          meta: { authRequired: true },
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/CreateVinylView.vue')
        },
        {
          path: '',
          name: 'vinyl',
          meta: { authRequired: false },
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/VinylListView.vue')
        },
      ]
    },

  ]
});

router.beforeEach((to, from) => {
  const store = useStore();
  const user = store.getters["user/getUserData"]();
  const {meta} = to;
  if(meta.authRequired && !user) {
    return {name: "login"}
  }
  return true
})

export default router
