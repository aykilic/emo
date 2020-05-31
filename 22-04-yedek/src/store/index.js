import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import stok from './module/stok.js'
// import example from './module-example'

Vue.use(Vuex, axios)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      
      stok,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
  })

  return Store
}