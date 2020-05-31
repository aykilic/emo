import Vue from 'vue'
import VueRouter from 'vue-router'
// var qs = require('qs');
import routes from './routes'
import basket from "../boot/basket.js"
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    // stringifyQuery  : query => {
      
    //   let result = qs.stringify(query, { format: 'RFC1738' })
    //   console.log(result);
    //   return result ? (' ' + result) : '-'
    // },
  //   parseQuery(query) {
  //     console.log(query);
  //     return qs.parse(query);
  // },
  // stringifyQuery(query) {
    
  //     var result = qs.stringify(query, { format: 'RFC1738' });
  //     console.log(result);
  //     return result ? ('' + result) : '';
  // },
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
    //   if (process.client) {
  //     console.log("seesion-auth-1")
  //   } else {
  //     console.log("seesion-auth-2")
  //   }
    
  })
  // Router.beforeEach((to, from, next) => {
  //   console.log(to);
  //   next()
  // })
  return Router
}
