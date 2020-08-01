import Vue from 'vue'
import { Loading, Cookies } from "quasar";
var jwt = require('../../node_modules/jsonwebtoken');
import token from "../../Apollo-Server/helpers/token";
require('../../node_modules/dotenv').config();
// import basket from "../boot/basket.js"
// meta: {
//   middleware: [ basket ]
// }
// const yukle = (to, from, next) => {
   
//   Loading.show()
//     next();
    
// }
// const bitir = (to, from, next) => {
  
//   Loading.hide()
//   next();
  
// }
// const ifAuthenticated = (to, from, next) => {

//   if (process.client) {
//     store.dispatch('initAuth');
//     console.log("client");
//   } else {
//     console.log("server");
  
//     store.dispatch('initAuth', req);
//   }
// }

export const routes = [
  {
    // meta: {
    //   middleware: [basket],
    // },
    // beforeEach((to, from, next) => {
    //   app.loading = true
    //   next()
    // }),
    
    // afterEach((to, from, next) => {
    //   setTimeout(() => app.loading = false, 1500) // timeout for demo purposes
    //   next()
    // }),
    
    path: '/admin',
    component: () => import('layouts/admin/AdminLayout.vue'),
    meta: { authorize: ['superuser'] },
    children: [
      { path: '', component: () => import('pages/admin/index.vue') },
      { path: '/kategori', component: () => import('pages/admin/kategori.vue') },
      { path: '/stokekle', component: () => import('pages/admin/stokekle.vue') },
      { path: '/varyantekle', component: () => import('pages/admin/varyantekle.vue') },
      { path: '/stokdevir', component: () => import('pages/admin/fisler/stokdevirfis.vue') },
      { path: '/stokalim', component: () => import('pages/admin/fisler/stokalimfis.vue') },
      { path: '/siparislist', component: () => import('pages/admin/siparislist.vue') },
      { path: '/faturalist', component: () => import('pages/admin/faturalist.vue') },
      { path: '/customerlist', component: () => import('pages/admin/customerlist.vue') },
      { path: '/anasayfaayar', component: () => import('pages/admin/anasayfaayar.vue') },
    ],
    beforeEnter: async (to, from, next) => {
      const token =Cookies.get('token')
       await jwt.verify(token, process.env.JWT_SECRET ,async function(err, token)  {
          if(err){
          
           next('/')
          return
         }else{
          
            if(token.role == 'superuser'){
              console.log("burada");
              next()
            }else{
              next('/')
            }
           
          return
         }
        
      });
      
    },
  },
  
  {
    // beforeEnter: ifAuthenticated,
    // beforeEnter: (to, from, next) => {
    //   next();
    // },
    path: '/shopping',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {path: '',  component: () => import('pages/shopping/sellmiddleware.vue')},
      {path: '/sell',  component: () => import('pages/shopping/sell.vue')},
    ]
  },
  {
    // beforeEach:yukle,
    // afterEach:bitir,
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: 'deneme', name:'deneme', component: () => import('pages/skeleton/deneme.vue')},
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: () => import('pages/login/login.vue') },

      { path: ':parentname', name:'stoklist', component: () => import('pages/products.vue'), props:true},
      // { path: ':stoklist/:stokad', name:'sales', component: () => import('pages/sales.vue')},
      { path: ':parentname/:stokad', name:'sales', component: () => import('pages/sales.vue'), props:true},
      
      // { path: '/:stokid?',name:'lohusa', component: () => import('pages/products.vue') },
    
    ]
  },

  
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}
  // if (process.client) {
      // console.log(process.env.MODE)
    // } else {
      // console.log("seesion-auth-2")
    // }
    // routes.beforeEach(async (to, from, next) => {
    //   const { authorize } = to.meta;
    //   const token =Cookies.get('token')

    //   if(authorize){
    //        await jwt.verify(token, process.env.JWT_SECRET ,async function(err, token)  {
    //       if(err){
          
    //        next('/')
    //       return
    //      }else{
    //       //   if(token.role == 'superuser'){
    //       //     console.log("burada");
    //       //     next()
    //       //   }else{
    //       //     next('/')
    //       //   }
    //       // return
    //       if (authorize.length && !authorize.includes(token.role)) {
    //         // role not authorised so redirect to home page
    //         return next({ path: '/' });
    //     }
    //      }
        
    //   });
    //   }
    //   next()
    // })
export default routes
// export const routes
