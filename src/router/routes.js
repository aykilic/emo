
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/admin/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Index.vue') },
      { path: '/kategori', component: () => import('pages/admin/kategori.vue') },
      { path: '/stokekle', component: () => import('pages/admin/stokekle.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
