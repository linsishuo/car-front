import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

import { routes } from "./routes"

const router = new VueRouter({
  mode: "hash",
  // base: process.env.VUE_APP_BASE_API,
  routes,
})

export default router
