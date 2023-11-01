import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      path: '/book/create',
      name: 'createBook',
      meta: { authRequired: false },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateBookView.vue')
    },
    {
      path: '/book/:id/edit',
      name: 'editBook',
      meta: { authRequired: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditBookView.vue')
    },
    {
      path: '/vinyl/:id/edit',
      name: 'editVinyl',
      meta: { authRequired: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditVinylView.vue')
    },
    {
      path: '/vinyl/create',
      name: 'createVinyl',
      meta: { authRequired: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateVinylView.vue')
    },
    {
      path: '/book',
      name: 'book',
      meta: { authRequired: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BookListView.vue')
    },
    {
      path: '/vinyl',
      name: 'vinyl',
      meta: { authRequired: false },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/VinylListView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { authRequired: false },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LogInView.vue')
    }
  ]
});

router.beforeEach((to, from) => {
  console.log("before each guard", to)
  const {meta} = to;
  if(meta.authRequired) {
    console.log("auth required route")
  }
  return true
})

export default router
