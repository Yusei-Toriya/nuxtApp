import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _370772bc = () => interopDefault(import('..\\pages\\createMemo.vue' /* webpackChunkName: "pages/createMemo" */))
const _1ee6a41a = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _52a805be = () => interopDefault(import('..\\pages\\mypage.vue' /* webpackChunkName: "pages/mypage" */))
const _7d507bee = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _c209716c = () => interopDefault(import('..\\pages\\memo\\_id.vue' /* webpackChunkName: "pages/memo/_id" */))
const _26e50adc = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/createMemo",
    component: _370772bc,
    name: "createMemo"
  }, {
    path: "/login",
    component: _1ee6a41a,
    name: "login"
  }, {
    path: "/mypage",
    component: _52a805be,
    name: "mypage"
  }, {
    path: "/register",
    component: _7d507bee,
    name: "register"
  }, {
    path: "/memo/:id?",
    component: _c209716c,
    name: "memo-id"
  }, {
    path: "/",
    component: _26e50adc,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
