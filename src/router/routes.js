
const routes = [
  {
    path: '/admin',
    component: () => import('layouts/admin/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Index.vue') },
      { path: '/kategori', component: () => import('pages/admin/kategori.vue') },
      { path: '/stokekle', component: () => import('pages/admin/stokekle.vue') },
      { path: '/varyantekle', component: () => import('pages/admin/varyantekle.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
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

export default routes
