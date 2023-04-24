import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'customers', component: () => import('pages/CustomerPage.vue') },
      {
        path: 'refs',
        children: [
          {
            path: 'products',
            component: () => import('pages/ProductPage.vue'),
          },
          {
            path: 'productList',
            component: () => import('pages/ProductListPage.vue'),
          },
          {
            path: 'productDetail/code=:code&libelle=:libelle',
            component: () => import('pages/ProductDetailPage.vue'),
            props : route => ({
              code : route.params.code,
              libelle : route.params.libelle
            })
          },
        ],
      },
      { path: 'clientsList', component: () => import('pages/ClientsListPage.vue') }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes