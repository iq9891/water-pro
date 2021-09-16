import Layout from '../components/layout';

export default [
  {
    path: '',
    redirect: '/utils/utils-copy-cn',
    component: Layout,
  },
  {
    path: 'utils-copy-cn',
    component: () => import('../docs/utils-copy/demo/index.vue'),
  },
];
