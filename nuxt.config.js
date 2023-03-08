import { Auth } from "@nuxtjs/auth-next"
import nuxtAuth from '@nuxtjs/auth'
import axios from 'axios'
export default {
  // srcDir: 'src/',
  // mode: 'universal',
  store: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'NuxtApp',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      // { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/scss/common.scss' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],
  router: {
    middleware: ['auth'],
    middleware: ['messages']
    // base: "/",
    // register: "/register",
  },
  layout: 'default',
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dotenv',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: [
      'assets/scss/_reset.scss',
      'assets/scss/_base.scss',
      'assets/scss/_common.scss',
      'assets/scss/_components.scss',
      'assets/scss/_fonts.scss',
      'assets/scss/_layout.scss',
      'assets/scss/_mixin.scss',
      'assets/scss/_pages.scss',
      'assets/scss/_project.scss',
      'assets/scss/_project_table.scss',
      'assets/scss/_setting.scss',
      'assets/scss/_utility.scss',
      'assets/scss/_variables.scss',
    ],
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
  axios: {
    baseURL: "http://localhost:5000/",
  },

  auth: {
    redirect: {
      home: "/mypage",
      logout: "/login",
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/auth/login",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "/auth/logout",
            method: "post",
          },
          user: {
            url: "/auth/user",
            method: "get",
            propertyName: "user",
          },
          userExist: {
            url: "/auth/userExist",
            method: "get",
            propertyName: "user",
          },
        },
      },
      tokenRequired: true,
      tokenType: 'bearer'
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['@nuxtjs/axios','axios'],
    loaders: {
      scss: {
        implementation: require('sass')
      }
    }
  },
}
