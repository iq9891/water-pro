/** @format */

import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

import Layout from '../components/layout';
import cptRoutes from './conf-cpt';
import utilsRoutes from './conf-utils';

const routes = [
  {
    path: '/components',
    component: Layout,
    props: route => {
      const name = route.path.split('/components/')[1].split('/')[0];
      return { name, showDemo: true };
    },
    children: cptRoutes,
  },
  {
    path: '/utils',
    component: Layout,
    props: route => {
      const name = route.path.split('/utils/')[1].split('/')[0];
      return { name, showDemo: true };
    },
    children: utilsRoutes,
  },
  {
    path: '',
    redirect: '/components/button-cn',
    component: Layout,
  },
];

// app router
const router = createRouter({
  history: createWebHistory('/'),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// config router
export function setupRouter(app: App<Element>) {
  app.use(router as any);
}

// router.onError((error) => {
//   console.error(error);
// });

export default router;
